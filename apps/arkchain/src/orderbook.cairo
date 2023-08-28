use arkchain::order::{OrderListing, OrderBuy};

#[starknet::interface]
trait IOrderbook<T> {
    fn register_broker(ref self: T, name: felt252, public_key: felt252, chain_id: felt252);
    fn add_order_listing(ref self: T, order: OrderListing);
    fn submit_order_buy(ref self: T, order: OrderBuy);
}

#[starknet::contract]
mod orderbook {
    use arkchain::broker::Broker;
    use arkchain::order::{
        OrderListing, OrderBuy, OrderStatus, OrderBuyExecute,
        compute_order_hash};
    use arkchain::order_db::{order_read, order_write, order_status_read, order_status_write};
    use starknet::{ContractAddress, ClassHash};
    use option::OptionTrait;
    use serde::Serde;
    use array::{ArrayTrait, SpanTrait};
    use starknet::SyscallResultTrait;

    use super::IOrderbook;

    use debug::PrintTrait;

    #[storage]
    struct Storage {
        owner: ContractAddress,
        // chain_id <> allowed or not.
        chains: LegacyMap::<felt252, bool>,
        // broker_name <> Broker.
        brokers: LegacyMap::<felt252, Broker>,
        // Executor address on Starknet.
        executor_address: ContractAddress,
        // Tokens in listing: (chain_id, collection, token_id) <> order hash.
        tokens_listing: LegacyMap::<(felt252, ContractAddress, u256), felt252>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        BrokerRegistered: BrokerRegistered,
        OrderListingAdded: OrderListingAdded,
        OrderBuyExecuting: OrderBuyExecuting,
        OrderBuyFinalized: OrderBuyFinalized,
        Upgraded: Upgraded,
    }

    #[derive(Drop, starknet::Event)]
    struct BrokerRegistered {
        #[key]
        name: felt252,
        #[key]
        chain_id: felt252,
        public_key: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct OrderListingAdded {
        #[key]
        hash: felt252,
        #[key]
        broker_name: felt252,
        #[key]
        chain_id: felt252,
        // TODO: add block timestamp.
        order: Span<felt252>,
    }

    #[derive(Drop, starknet::Event)]
    struct OrderBuyExecuting {
        #[key]
        hash: felt252,
        #[key]
        broker_name: felt252,
        #[key]
        chain_id: felt252,
        // TODO: add block timestamp.
        order: Span<felt252>,
    }

    #[derive(Drop, starknet::Event)]
    struct OrderBuyFinalized {
        #[key]
        hash: felt252,
        #[key]
        broker_name: felt252,
        #[key]
        chain_id: felt252,
        // TODO: add block timestamp.
        order: Span<felt252>,
    }

    #[derive(Drop, starknet::Event)]
    struct Upgraded {
        class_hash: ClassHash,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, executor: ContractAddress) {
        self.owner.write(owner);
        self.executor_address.write(executor);
        self.chains.write('starknet_testnet', true);
    }

    #[l1_handler]
    fn finalize_order_buy(ref self: ContractState, from_address: felt252, order_hash: felt252) {
        assert(from_address == self.executor_address.read().into(), 'Bad executor');

        let tup: (Option<OrderStatus>, Option<OrderListing>) = order_read::<OrderListing>(order_hash);

        let (status, order) = tup;

        if order.is_none() {
            panic_with_felt252('Order must exist');
        }

        let order = order.unwrap();

        // TODO: check if we need double check here. It should not be necessary.
        let broker = self.brokers.read(order.broker_name);

        if status.is_none() {
            panic_with_felt252('Order does not exist');
        }

        match status.unwrap() {
            OrderStatus::Open => panic_with_felt252('Order bad open status'),
            OrderStatus::Executing => {
                if !order_status_write(order_hash, OrderStatus::Finalized) {
                    panic_with_felt252('Couldnt finalize the order')
                }

                // Ensure the token is not considered as listed.
                self.tokens_listing.write(
                    (broker.chain_id, order.collection, order.token_id),
                    0
                );
            },
            OrderStatus::Finalized => panic_with_felt252('Order already finalized'),
            OrderStatus::Cancelled => panic_with_felt252('Order already cancelled'),
        }
    }

    #[external(v0)]
    fn upgrade(ref self: ContractState, class_hash: ClassHash) {
        assert(
            starknet::get_caller_address() == self.owner.read(),
            'Unauthorized replace class'
        );

        match starknet::replace_class_syscall(class_hash) {
            Result::Ok(_) => self.emit(Upgraded { class_hash }),
            Result::Err(revert_reason) => panic(revert_reason),
        };
    }

    #[external(v0)]
    impl OrderbookImpl of IOrderbook<ContractState> {
        fn register_broker(
            ref self: ContractState,
            name: felt252,
            public_key: felt252,
            chain_id: felt252
        ) {
            // TODO: add pre-validation of the broker.
            assert(self.chains.read(chain_id), 'Invalid chain id');
            assert(name != 0, 'Invalid broker name');
            assert(!_is_broker_registered(@self, name), 'Broker already registered');

            self.brokers.write(name, Broker {
                name,
                public_key,
                chain_id,
            });

            self.emit(BrokerRegistered {
                name,
                chain_id,
                public_key,
            });
        }

        fn add_order_listing(ref self: ContractState, order: OrderListing) {
            let b = self.brokers.read(order.broker_name);
            if b.name != order.broker_name {
                panic_with_felt252('Broker not registered');
            }

            // TODO: verify signature.

            let hash = compute_order_hash(order);

            let status = order_status_read(hash);
            if status.is_some() {
                panic_with_felt252('Order already registered');
            }

            assert(self.tokens_listing.read((b.chain_id, order.collection, order.token_id))
                   == 0,
                   'Token already listed');

            order_write(hash, order);

            self.tokens_listing.write((b.chain_id, order.collection, order.token_id), hash);

            let mut buf = array![];
            order.serialize(ref buf);

            self.emit(OrderListingAdded {
                hash,
                broker_name: b.name,
                chain_id: b.chain_id,
                order: buf.span(),
            });

            // When an order is cancelled -> the token must be removed from
            // listing.

            // When an order is finalized -> the token must be removed from
            // listing.
        }

        fn submit_order_buy(ref self: ContractState, order: OrderBuy) {
            let b = self.brokers.read(order.broker_name);
            if b.name != order.broker_name {
                panic_with_felt252('Broker not registered');
            }

            let tup: (Option<OrderStatus>, Option<OrderListing>)
                = order_read::<OrderListing>(order.order_listing_hash);

            let (status, listing_order) = tup;

            if listing_order.is_none() {
                panic_with_felt252('Order must exist');
            }

            let listing_order = listing_order.unwrap();

            match status {
                Option::Some(status) => {
                    if status != OrderStatus::Open {
                        panic_with_felt252('Order must be open');
                    }
                },
                Option::None => panic_with_felt252('Order must exist'),
            }

            let exec = OrderBuyExecute {
                order_hash: order.order_listing_hash,
                nft_address: listing_order.collection,
                token_id: listing_order.token_id,
                maker_address: listing_order.seller,
                taker_address: order.buyer,
                price: listing_order.price,
            };

            let mut buf = array![];
            exec.serialize(ref buf);

            starknet::send_message_to_l1_syscall(
                self.executor_address.read().into(),
                buf.span(),
            ).unwrap_syscall();
        }
    }

    fn _is_broker_registered(self: @ContractState, name: felt252) -> bool {
        self.brokers.read(name).name == name
    }
}

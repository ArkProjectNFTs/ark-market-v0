#[starknet::contract]
mod executor {
    use traits::Into;
    use starknet::{ContractAddress, ClassHash};
    use ark_executor::interfaces::{
        IExecutor, IERCDispatcher, IERCDispatcherTrait, IUpgradable, OrderExecute
    };

    #[storage]
    struct Storage {
        admin_address: ContractAddress,
        arkchain_sequencer_address: ContractAddress,
        eth_contract_address: ContractAddress,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OrderExecuted: OrderExecuted, 
    }

    #[derive(Drop, starknet::Event)]
    struct OrderExecuted {
        #[key]
        order_hash: felt252,
        block_timestamp: u64
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        admin_address: ContractAddress,
        arkchain_sequencer_address: ContractAddress,
        eth_contract_address: ContractAddress
    ) {
        self.admin_address.write(admin_address);
        self.eth_contract_address.write(eth_contract_address);
        self.arkchain_sequencer_address.write(arkchain_sequencer_address);
    }


    #[external(v0)]
    impl ExecutorImpl of IExecutor<ContractState> {
        fn update_sequencer_address(ref self: ContractState, sequencer_address: ContractAddress) {
            assert(
                starknet::get_caller_address() == self.admin_address.read(),
                'Unauthorized admin address'
            );

            self.arkchain_sequencer_address.write(sequencer_address);
        }

        fn execute_buy_order(ref self: ContractState, order: OrderExecute) {
            assert(
                starknet::get_caller_address() == self.arkchain_sequencer_address.read(),
                'Invalid msg sender'
            );

            let nft_contract = IERCDispatcher { contract_address: order.nft_address };
            nft_contract.transferFrom(order.maker_address, order.taker_address, order.token_id);

            let eth_contract = IERCDispatcher {
                contract_address: self.eth_contract_address.read()
            };

            eth_contract.transferFrom(order.taker_address, order.maker_address, order.price);

            let block_timestamp = starknet::info::get_block_timestamp();
            self.emit(OrderExecuted { order_hash: order.order_hash, block_timestamp });
        }
    }

    #[external(v0)]
    impl ExecutorUpgradeImpl of IUpgradable<ContractState> {
        fn upgrade(ref self: ContractState, class_hash: ClassHash) {
            assert(
                starknet::get_caller_address() == self.admin_address.read(),
                'Unauthorized replace class'
            );

            match starknet::replace_class_syscall(class_hash) {
                Result::Ok(_) => (), // emit event
                Result::Err(revert_reason) => panic(revert_reason),
            };
        }

        fn update_admin_address(ref self: ContractState, admin_address: ContractAddress) {
            assert(
                starknet::get_caller_address() == self.admin_address.read(),
                'Unauthorized admin address'
            );

            self.admin_address.write(admin_address);
        }
    }
}

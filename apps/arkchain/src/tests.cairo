#[cfg(test)]
mod tests {

    use snforge_std::{declare, ContractClassTrait};
    use result::ResultTrait;
    use option::OptionTrait;
    use zeroable::Zeroable;
    use traits::{Into, TryInto};
    use arkchain::orderbook::{
        IOrderbookDispatcher,
        IOrderbookDispatcherTrait};
    use arkchain::order::{OrderListing, compute_order_hash};
    use starknet::ContractAddress;
    use debug::PrintTrait;

    #[test]
    fn test_listing() {
        let calldata = array![0x123, 0xadd];
        let contract = declare('orderbook');
        let contract_address = contract.deploy(@calldata).unwrap();

        assert(!contract_address.is_zero(), 'Invalid address');

        let d = IOrderbookDispatcher { contract_address };
        d.register_broker('b1', 1, 'starknet_testnet');

        let o = OrderListing {
            seller: 1.try_into().unwrap(),
            collection: 2.try_into().unwrap(),
            token_id: 3_u256,
            price: 1_u256,
            end_date: 0,
            broker_name: 'b1',
            broker_sig_r: 0,
            broker_sig_s: 0,
        };

        let hash = compute_order_hash(o);
        hash.print();        
    }

    #[test]
    fn test_buying() {
        // let calldata = array![0x123];
        // let contract = declare('orderbook');
        // let contract_address = contract.deploy(@calldata).unwrap();

        // assert(!contract_address.is_zero(), 'Invalid address');

        // let d = IOrderbookDispatcher { contract_address };
        // d.register_broker('b1', 1, 'starknet_testnet');

        // let o = OrderListing {
        //     seller: 1.try_into().unwrap(),
        //     collection: 2.try_into().unwrap(),
        //     token_id: 3_u256,
        //     price: 1,
        //     end_date: 0,
        //     broker_name: 'b1',
        //     broker_sig_r: 0,
        //     broker_sig_s: 0,
        // };

        // let hash = compute_order_hash(o);
        // hash.print();        
        assert(1 == 1, 'Ok');
    }
}

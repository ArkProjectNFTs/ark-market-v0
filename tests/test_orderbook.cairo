%lang starknet
from src.orderbook import create_listing, get_curr_order_id
from starkware.cairo.common.cairo_builtins import HashBuiltin

func create_fake_nft() -> (token_address: felt) {
    // TODO
    return (token_address=0);
}

@external
func test_create_listing{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() {
    let (token_address) = create_fake_nft();
    let token_id = 0;
    let price = 1000000000000000;
    let owner = 0x004febf0e16616092df71a707615cbe8f89046787688fcfa2e778e0a99b77d9f;
    let dt = 0;

    let (order_id) = create_listing(token_address, 0, 42, 0, 0);
    assert order_id = 0;
    let (id) = get_curr_order_id();
    assert id = 1;

    return ();
}

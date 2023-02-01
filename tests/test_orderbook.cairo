%lang starknet
from src.orderbook import create_listing, get_curr_order_id, get_order
from starkware.cairo.common.cairo_builtins import HashBuiltin

func create_fake_nft{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    token_address: felt
) {
    alloc_locals;

    local sample_token_contract_address: felt;
    // We deploy contract and put its address into a local variable. Second argument is calldata array
    %{ ids.sample_token_contract_address = deploy_contract("./src/sample_token.cairo", [141209322633449662575690049095428871608455322718108909912289871335706295711]).contract_address %}

    return (token_address=sample_token_contract_address);
}

@external
func test_create_listing{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() {
    let token_address = create_fake_nft();

    // let token_id = 0;
    // let price = 1000000000000000;

    // let dt = 0;
    // let price = 42;

    // let (order_id) = create_listing(token_address, 0, price, 0, 0);
    // assert order_id = 0;

    // let (id) = get_curr_order_id();
    // assert id = 1;

    // let (order) = get_order(order_id);
    // assert order.token_address = token_address;
    // assert order.price = 42;

    return ();
}

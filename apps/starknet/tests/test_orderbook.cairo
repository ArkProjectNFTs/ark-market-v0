%lang starknet
from src.orderbook import create_listing, get_curr_order_id, get_order
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.alloc import alloc
from src.utils.handle_revoked_refs import handle_revoked_refs

@contract_interface
namespace SampleToken {
    func safeMint(to: felt, tokenId: Uint256, data_len: felt, data: felt*, tokenURI: felt) {
    }

    func owner() -> (owner: felt) {
    }

    func name() -> (name: felt) {
    }
}

@external
func __setup__() {
    %{ context.sample_token_contract_address = deploy_contract("./src/sample_token.cairo", [141209322633449662575690049095428871608455322718108909912289871335706295711]).contract_address %}
    return ();
}

func mint_fake_nft{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    token_address: felt
) {
    alloc_locals;

    local sample_token_contract_address: felt;
    %{ ids.sample_token_contract_address = context.sample_token_contract_address %}
    %{ print(ids.sample_token_contract_address) %}

    let (name: felt) = SampleToken.name(contract_address=sample_token_contract_address);
    %{ print(ids.name) %}

    // let (data: felt*) = alloc();
    // SampleToken.safeMint(
    //     contract_address=sample_token_contract_address,
    //     to=141209322633449662575690049095428871608455322718108909912289871335706295711,
    //     tokenId=Uint256(0, 0),
    //     data_len=0,
    //     data=data,
    //     tokenURI=0,
    // );

    return (token_address=sample_token_contract_address);
}

@external
func test_create_listing{syscall_ptr: felt*, range_check_ptr, pedersen_ptr: HashBuiltin*}() {
    alloc_locals;

    let (token_address) = mint_fake_nft();
    let token_id: felt = 0;
    let dt: felt = 0;

    let (order_id) = create_listing(token_address, 0, 1000000000000000, 0, 0);
    assert order_id = 0;

    let (id) = get_curr_order_id();
    assert id = 1;

    let (order) = get_order(order_id);
    assert order.token_address = token_address;
    assert order.price = 1000000000000000;

    return ();
}

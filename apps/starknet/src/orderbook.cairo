%lang starknet
from starkware.cairo.common.math import assert_nn
from starkware.cairo.common.cairo_builtins import HashBuiltin

// Data structure representing an order.
struct Order {
    token_address: felt,
    id: felt,
    is_buy: felt,
    price: felt,
    status: felt,
    dt: felt,
    owner: felt,
}

@storage_var
func orders(id: felt) -> (order: Order) {
}

@storage_var
func curr_order_id() -> (id: felt) {
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    return ();
}

@external
func create_listing{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    token_address: felt, token_id: felt, price: felt, owner: felt, dt: felt
) -> (order_id: felt) {
    alloc_locals;

    let (id) = get_curr_order_id();
    tempvar new_order: Order* = new Order(
        token_address=token_address, id=id, is_buy=0, price=price, status=0, dt=dt, owner=owner
    );

    curr_order_id.write(id + 1);
    orders.write(id, [new_order]);

    return (order_id=id);
}

@view
func get_order{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(order_id: felt) -> (
    order: Order
) {
    let (order) = orders.read(order_id);
    return (order=order);
}

@view
func get_curr_order_id{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    id: felt
) {
    let (id) = curr_order_id.read();
    return (id=id);
}

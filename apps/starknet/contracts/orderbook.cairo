%lang starknet

from starkware.cairo.common.serialize import serialize_word
from starkware.cairo.common.math import assert_nn
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.uint256 import Uint256

struct ContractNode {
    id: felt,
    val: felt,
    next_id: felt,
}

@storage_var
func contract_list(id: felt) -> (contract_node: ContractNode) {
}

// Stores head of singly linked list.
@storage_var
func contract_list_head() -> (id: felt) {
}

// Stores tail of singly linked list.
@storage_var
func contract_list_tail() -> (id: felt) {
}

// Stores length of singly linked list.
@storage_var
func contract_list_len() -> (len: felt) {
}

// Stores latest contract item id.
@storage_var
func curr_contract_id() -> (id: felt) {
}

// get one particular item from the list
func contract_list_get{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    node_loc: felt, idx: felt
) -> (node: ContractNode) {
    let (node) = contract_list.read(node_loc);
    if (idx == 0) {
        return (node=node);
    }
    return contract_list_get(node.next_id, idx - 1);
}

func contract_node_create{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    val: felt, next_id: felt
) -> (new_node: ContractNode) {
    alloc_locals;

    let (id) = curr_contract_id.read();
    tempvar new_node: ContractNode* = new ContractNode(id=id, val=val, next_id=next_id);
    contract_list.write(id, [new_node]);
    curr_contract_id.write(id + 1);

    return (new_node=[new_node]);
}

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    curr_contract_id.write(1);
    return ();
}


// Specs
// if collection exist
//     if listing for token exist
//         create new listing
//     else
//         add token to listing
// else
//     create new collection
//     add token to listing

@external
func create_listing{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    contract_address: felt, token_id: Uint256, price: felt, owner: felt
) {
    alloc_locals;

    let (new_node) = contract_node_create(val=contract_address, next_id=-1);
    let (length) = contract_list_len.read();

    if (length == 0) {
        contract_list_head.write(new_node.id);
        contract_list_tail.write(new_node.id);
    } else {
        let (tail_id) = contract_list_tail.read();
        let (tail) = contract_list.read(tail_id);
        tempvar new_tail: ContractNode* = new ContractNode(
            id=tail.id, val=tail.val, next_id=new_node.id
        );
        contract_list.write(tail_id, [new_tail]);
        contract_list_tail.write(new_node.id);
    }

    contract_list_len.write(length + 1);

    return ();
}

@view
func get_listing{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    idx: felt
) -> (elem: ContractNode) {
    let (elem) = contract_list.read(idx);
    // let (node) = contract_list_get(head_id, idx);
    return (elem=elem);
}
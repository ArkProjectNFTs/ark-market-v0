%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math_cmp import is_le
from starkware.cairo.common.math import unsigned_div_rem

// Data structure representing a node in a doubly linked list.
struct Node {
    id : felt,
    val : felt,
    next_id : felt,
    prev_id : felt,
}

// Stores current nodes in doubly linked list.
@storage_var
func dl_list(id : felt) -> (node : Node) {
}

// Stores head of doubly linked list.
@storage_var
func dl_list_head() -> (id : felt) {
}

// Stores tail of doubly linked list.
@storage_var
func dl_list_tail() -> (id : felt) {
}

// Stores length of doubly linked list.
@storage_var
func dl_list_len() -> (len : felt) {
}

// Stores latest item id.
@storage_var
func curr_item_id() -> (id : felt) {
}

@constructor
func constructor{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} () {
    curr_item_id.write(1);
    tempvar empty_node: Node* = new Node(id=-1, val=-1, next_id=-1, prev_id=-1);
    dl_list.write(-1, [empty_node]);
    return ();
}

// Create new node for doubly linked list.
// @param val : new value
// @param next_id : id of next value
// @return new_node : node representation of new value
func dl_node_create{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (val : felt, next_id : felt, prev_id : felt) -> (new_node : Node) {
    alloc_locals;

    let (id) = curr_item_id.read();
    tempvar new_node: Node* = new Node(id=id, val=val, next_id=next_id, prev_id=prev_id);
    dl_list.write(id, [new_node]);
    curr_item_id.write(id + 1);

    return (new_node=[new_node]);
}

// Insert item at end of the list.
// @param val : new value to be added to list
func dl_list_push{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (val : felt) {
    alloc_locals;

    let (new_node) = dl_node_create(val=val, next_id=-1, prev_id=-1);
    let (length) = dl_list_len.read();

    if (length == 0) {
        dl_list_head.write(new_node.id);
        dl_list_tail.write(new_node.id);
        handle_revoked_refs();
    } else {
        let (tail_id) = dl_list_tail.read();
        let (tail) = dl_list.read(tail_id);
        tempvar new_tail: Node* = new Node(id=tail.id, val=tail.val, next_id=new_node.id, prev_id=tail.prev_id);
        dl_list.write(tail_id, [new_tail]);
        tempvar new_node_updated: Node* = new Node(id=new_node.id, val=new_node.val, next_id=new_node.id, prev_id=tail_id);
        dl_list.write(new_node.id, [new_node_updated]);
        dl_list_tail.write(new_node.id);
        handle_revoked_refs();
    }

    dl_list_len.write(length + 1);

    return ();
}


// Remove item from the end of the list.
// @return del : node deleted from list (or empty node if list is empty)
func dl_list_pop{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} () -> (del : Node) {
    alloc_locals;
    
    let (length) = dl_list_len.read();
    tempvar empty_node: Node* = new Node(id=-1, val=-1, next_id=-1, prev_id=-1);

    if (length == 0) {
        return (del=[empty_node]);
    }

    let (head_id) = dl_list_head.read();
    let (old_tail_id) = dl_list_tail.read();
    let (old_tail) = dl_list.read(old_tail_id);

    if (length - 1 == 0) {   
        dl_list.write(head_id, [empty_node]);
        dl_list.write(old_tail_id, [empty_node]);
        dl_list_head.write(-1);
        dl_list_tail.write(-1);
        handle_revoked_refs();
    } else {
        dl_list_tail.write(old_tail.prev_id);
        let (new_tail) = dl_list.read(old_tail.prev_id);
        tempvar new_tail_updated: Node* = new Node(id=new_tail.id, val=new_tail.val, next_id=-1, prev_id=new_tail.prev_id);
        dl_list.write(new_tail.id, [new_tail_updated]);
        handle_revoked_refs();
    }

    tempvar old_tail_updated: Node* = new Node(id=old_tail.id, val=old_tail.val, next_id=old_tail.next_id, prev_id=-1);

    dl_list_len.write(length - 1);

    return (del=[old_tail_updated]);
}

// Remove item from the head of the doubly linked list.
// @return del : old head deleted from doubly linked list
func dl_list_shift{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} () -> (del : Node) {
    alloc_locals;

    let (length) = dl_list_len.read();
    tempvar empty_node: Node* = new Node(id=-1, val=-1, next_id=-1, prev_id=-1);
    if (length == 0) {
        return (del=[empty_node]);
    }

    let (old_head_id) = dl_list_head.read();
    let (old_head) = dl_list.read(old_head_id);

    if (length - 1 == 0) {
        dl_list.write(old_head_id, [empty_node]);
        let (tail_id) = dl_list_tail.read();
        dl_list.write(tail_id, [empty_node]);
        dl_list_head.write(-1);
        dl_list_tail.write(-1);
        handle_revoked_refs();
    } else {
        dl_list_head.write(old_head.next_id);
        let (new_head) = dl_list.read(old_head.next_id);
        tempvar new_head_updated: Node* = new Node(id=new_head.id, val=new_head.val, next_id=new_head.next_id, prev_id=-1);
        dl_list.write(new_head.id, [new_head_updated]);
        handle_revoked_refs();
    }

    tempvar old_head_updated: Node* = new Node(id=old_head.id, val=old_head.val, next_id=-1, prev_id=old_head.prev_id);

    dl_list_len.write(length - 1);

    return (del=[old_head_updated]);
}

// Insert item to the head of the list.
// @param val : new value inserted to list
func dl_list_unshift{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (val : felt) {
    alloc_locals;

    let (head_id) = dl_list_head.read();
    let (new_node) = dl_node_create(val=val, next_id=head_id, prev_id=-1);
    let (length) = dl_list_len.read();

    if (length == 0) {
        dl_list_head.write(new_node.id);
        dl_list_tail.write(new_node.id);
        handle_revoked_refs();
    } else {
        let (old_head) = dl_list.read(head_id);
        tempvar old_head_updated: Node* = new Node(id=old_head.id, val=old_head.val, next_id=old_head.next_id, prev_id=new_node.id);
        dl_list.write(old_head.id, [old_head_updated]);
        tempvar new_node_updated: Node* = new Node(id=new_node.id, val=new_node.val, next_id=old_head.id, prev_id=new_node.prev_id);
        dl_list.write(new_node.id, [new_node_updated]);
        dl_list_head.write(new_node.id);
        handle_revoked_refs();
    }

    dl_list_len.write(length + 1);
      
    return ();
}

// Retrieve value at particular position in the list.
// @param idx : counter for number of traverses of linked list
// @return node : retrieved Node
func dl_list_get{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (idx : felt) -> (node : Node) {
    let (in_range) = validate_idx(idx);
    if (in_range == 0) {
        tempvar empty_node: Node* = new Node(id=-1, val=-1, next_id=-1, prev_id=-1);
        return (node=[empty_node]);
    }

    let (head_id) = dl_list_head.read();
    let (head) = dl_list.read(head_id);
    let (tail_id) = dl_list_tail.read();
    let (tail) = dl_list.read(tail_id);

    let (length) = dl_list_len.read();
    let (half_length, _) = unsigned_div_rem(length, 2);
    let less_than_half = is_le(idx, half_length);

    if (less_than_half == 1) {
        let (node) = locate_item_from_head(i=0, idx=idx, curr=head);
        return (node=node);
    } else {
        let (node) = locate_item_from_tail(i=length-1, idx=idx, curr=tail);
        return (node=node);
    }
}

func locate_item_from_head{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (i : felt, idx : felt, curr : Node) -> (node : Node) {
    if (i == idx) {
        return (node=curr);
    }
    let (next) = dl_list.read(curr.next_id);
    return locate_item_from_head(i + 1, idx, next);
}

func locate_item_from_tail{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (i : felt, idx : felt, curr : Node) -> (node : Node) {
    if (i == idx) {
        return (node=curr);
    }
    let (prev) = dl_list.read(curr.prev_id);
    return locate_item_from_tail(i - 1, idx, prev);
}

// Set value at particular position in the list.
// @param idx : element to be updated
// @param val : new value
// @return success : 1 if node was found, 0 otherwise
func dl_list_set{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (idx : felt, val : felt) -> (success : felt) {
    let (in_range) = validate_idx(idx);
    if (in_range == 0) {
        return (success=0);
    }
    let (head_id) = dl_list_head.read();
    let (node) = dl_list_get(idx);
    tempvar updated_node: Node* = new Node(id=node.id, val=val, next_id=node.next_id, prev_id=node.prev_id);
    dl_list.write(node.id, [updated_node]);

    return (success=1);
}

// Insert value at particular position in the list.
// @param idx : position of list to insert new value
// @param val : new value to insert
// @return success : 1 if insertion was successful, 0 otherwise
func dl_list_insert{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (idx : felt, val : felt) -> (success : felt) {
    alloc_locals;

    let (in_range) = validate_idx(idx + 1);
    if (in_range == 0) {
        return (success=0);
    }
    let (length) = dl_list_len.read();
    if (idx == length) {
        dl_list_push(val);
        return (success=1);
    }
    if (idx == 0) {
        dl_list_unshift(val);
        return (success=1);
    }

    let (prev) = dl_list_get(idx - 1);
    let (node) = dl_list.read(prev.next_id);
    let (new_node) = dl_node_create(val=val, next_id=node.id, prev_id=prev.id);
    tempvar new_prev: Node* = new Node(id=prev.id, val=prev.val, next_id=new_node.id, prev_id=prev.prev_id); 
    dl_list.write(prev.id, [new_prev]);
    tempvar updated_node: Node* = new Node(id=node.id, val=node.val, next_id=node.next_id, prev_id=new_node.id);
    dl_list.write(node.id, [updated_node]);

    dl_list_len.write(length + 1);

    return (success=1);
}

// Remove value at particular position in the list.
// @param idx : list item to be deleted
// @return del : deleted Node
func dl_list_remove{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (idx : felt) -> (del : Node) {
    alloc_locals;

    tempvar empty_node: Node* = new Node(id=-1, val=-1, next_id=-1, prev_id=-1); 
    let (in_range) = validate_idx(idx);
    if (in_range == 0) {
        return (del=[empty_node]);
    }
    let (length) = dl_list_len.read();
    if (idx == length - 1) {
        let (del) = dl_list_pop();
        return (del=del);
    }
    if (idx == 0) {
        let (del) = dl_list_shift();
        return (del=del);
    }

    let (removed) = dl_list_get(idx);
    let (removed_prev) = dl_list.read(removed.prev_id);
    tempvar updated_removed_prev: Node* = new Node(id=removed_prev.id, val=removed_prev.val, next_id=removed.next_id, prev_id=removed_prev.prev_id); 
    dl_list.write(removed_prev.id, [updated_removed_prev]);
    let (removed_next) = dl_list.read(removed.next_id);
    tempvar updated_removed_next: Node* = new Node(id=removed_next.id, val=removed_next.val, next_id=removed_next.next_id, prev_id=removed.prev_id); 
    dl_list.write(removed_next.id, [updated_removed_next]);
    tempvar updated_removed: Node* = new Node(id=removed.id, val=removed.val, next_id=-1, prev_id=-1); 
    dl_list.write(removed.id, [updated_removed]);

    dl_list_len.write(length - 1);

    return (del=removed);

}

// Utility function to check idx is not out of bounds.
// @param idx : index to check
// @return in_range : 1 if idx in range, 0 otherwise
func validate_idx{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (idx : felt) -> (in_range : felt) {
    alloc_locals;
    
    let (length) = dl_list_len.read();
    let idx_negative = is_le(idx, -1);
    let idx_out_of_bounds = is_le(length, idx);

    if ((idx_negative - 1) * (idx_out_of_bounds - 1) == 0) {
        handle_revoked_refs();
        return (in_range=0);
    } else {
        handle_revoked_refs();
        return (in_range=1);
    }
}

// Utility function for printing doubly linked list.
func print_dl_list{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} (node_loc : felt, idx: felt) {
    if (idx == 0) {
        return ();
    }
    let (node) = dl_list.read(node_loc);
    return print_dl_list(node.next_id, idx - 1);
}

// Utility function for printing storage vars. 
func print_diagnostics{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} () {
    let (head_id) = dl_list_head.read();
    let (head) = dl_list.read(head_id);
    let (tail_id) = dl_list_tail.read();
    let (tail) = dl_list.read(tail_id);
    let (len) = dl_list_len.read();
    return ();
}

// Utility function to handle revoked implicit references.
// @dev tempvars used to handle revoked implict references
func handle_revoked_refs{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
} () {
    tempvar syscall_ptr=syscall_ptr;
    tempvar pedersen_ptr=pedersen_ptr;
    tempvar range_check_ptr=range_check_ptr;
    return ();
}
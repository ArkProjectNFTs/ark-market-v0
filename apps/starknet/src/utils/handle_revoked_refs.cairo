%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin

// Utility function to handle revoked implicit references.
func handle_revoked_refs{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    tempvar syscall_ptr = syscall_ptr;
    tempvar pedersen_ptr = pedersen_ptr;
    tempvar range_check_ptr = range_check_ptr;
    return ();
}

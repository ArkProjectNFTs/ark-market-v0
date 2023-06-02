// #########################################################################
// #                             SPOILER ALERT                             #
// #                                                                       #
// # This is the solution to the puzzle.                                   #
// # You can find the puzzle without its solution in the Cairo Playground. #
// #########################################################################

// # Program hash: 0x001626f02c7ea1a6974ae3ab485216f148fe0255dd3132f862ef068b8c12a2bd.

// # This puzzle simulates a Turing Machine.
// # The objective is: find a Turing Machine with no more than 3 states and an alphabet of size 7
// # (0, 1, ..., 6) that given the initial tape ...0001000... (where the head points to the 1)
// # outputs the string 1212212222122222222122222222222222221... such that the number of 2s between two
// # consecutive 1s is doubled every time (1, 2, 4, 8, ...).
// # In fact, the code below only tests that after a certain amount of steps the tape reaches:
// #   121221222212222222212222222222222222.

%builtins output range_check

from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.math import assert_nn_le
from starkware.cairo.common.registers import get_fp_and_pc

# The maximal size of the alphabet.
const VALUE_BOUND = 7
# The number of states.
const AMOUNT = 3

# A linked list representing one side of the tape.
struct List:
    member head : felt = 0
    member tail : List* = 1
    const SIZE = 2
end

# A possible action of the machine where:
#   typ - 0 for moving left, 1 for moving right.
#   value - the value to write at the location of the head.
#   next - the next state (a list of 7 possible actions, one for each alphabet symbol).
struct Action:
    member typ : felt = 0
    member value : felt = 1
    member next : Action* = 2
    const SIZE = 3
end

# The entire state of the machine.
struct Context:
    # The value at the position of the head.
    member value : felt = 0
    # The tape to the left of the head.
    member list1 : List* = 1
    # The tape to the right of the head.
    member list2 : List* = 2
    # The current state (a list of 7 possible actions, one for each alphabet symbol).
    member state : Action* = 3
    const SIZE = 4
end

# Apply a "Move left" action (write action.value at the position of the head, and moves left).
func action0(context : Context*, action : Action*) -> (context : Context*):
    alloc_locals
    local new_list2 : List
    local new_context : Context
    let (__fp__, _) = get_fp_and_pc()

    assert new_list2.tail = context.list2
    assert new_list2.head = action.value
    assert new_context.list2 = &new_list2
    tempvar list1 = context.list1
    assert new_context.value = list1.head
    assert new_context.list1 = list1.tail
    assert new_context.state = action.next
    return (context=&new_context)
end

# Same as action0, except that it moves right.
func action1(context : Context*, action : Action*) -> (context : Context*):
    alloc_locals
    local new_list1 : List
    local new_context : Context
    let (__fp__, _) = get_fp_and_pc()

    assert new_list1.tail = context.list1
    assert new_list1.head = action.value
    assert new_context.list1 = &new_list1
    tempvar list2 = context.list2
    assert new_context.value = list2.head
    assert new_context.list2 = list2.tail
    assert new_context.state = action.next
    return (context=&new_context)
end

# Runs 'length' steps of the machine.
func run(context : Context*, length : felt) -> (context : Context*):
    if length == 0:
        return (context=context)
    end

    %{
        # Change to True to show the intermediate states of the tape.
        if False:
            # Print the tape.
            res = str(ids.context.value)
            x = ids.context.list1
            for i in range(10):
                res = str(memory[x]) + res
                x = memory[x + 1]
            x = ids.context.list2
            for i in range(10):
                res += str(memory[x])
                x = memory[x + 1]
            print(res)
            # Print the head position with the state.
            print(' ' * 10 + str(ids.context.state.offset // (ids.VALUE_BOUND * ids.Action.SIZE)))
    %}
    tempvar action = context.state + Action.SIZE * context.value
    if action.typ == 0:
        let (context) = action0(context=context, action=action)
    else:
        let (context) = action1(context=context, action=action)
    end

    run(context=context, length=length - 1)
    return (...)
end

# Validates that the first 'length' values in 'list' have values encoded by 'expected'.
# The encoding is defined by taking the binary representation of 'expected' and adding one to each
# binary digit (moving 0 to 1 and 1 to 2).
func validate(list : List*, expected : felt, length : felt):
    if length == 0:
        assert expected = 0
        return ()
    end

    alloc_locals
    tempvar z = list.head - 1
    assert z = z * z
    validate(list=list.tail, expected=(expected - z) / 2, length=length - 1)
    return ()
end

# Validates that the machine definition is valid.
func check_actions(range_check_ptr, all_actions : Action*, n_actions : felt, i : felt) -> (
        range_check_ptr):
    if i == 0:
        return (range_check_ptr=range_check_ptr)
    end

    let i = i - 1

    tempvar action = all_actions + i * Action.SIZE
    let (range_check_ptr) = assert_nn_le(range_check_ptr, action.value, VALUE_BOUND - 1)
    let (range_check_ptr) = assert_nn_le(
        range_check_ptr, (action.next - all_actions) / (VALUE_BOUND * Action.SIZE), AMOUNT - 1)

    check_actions(
        range_check_ptr=range_check_ptr, all_actions=all_actions, n_actions=n_actions, i=i)
    return (...)
end

func main(output_ptr, range_check_ptr) -> (output_ptr, range_check_ptr):
    alloc_locals
    local all_actions : Action*
    %{
        MOVE_LEFT, MOVE_RIGHT = range(2)
        ids.all_actions = segments.add()
        # Give names to the three states.
        NEXT_ITERATION, WRITE4, SEARCH_NEXT = [
            ids.all_actions.address_ + i * ids.Action.SIZE * ids.VALUE_BOUND for i in range(3)]
        DONT_CARE = 0, 0, NEXT_ITERATION
        # The transition table. Each state is represented by 7 actions, one for each alphabet
        # symbol. Each action is represented by a triple (direction, value, next_state).
        segments.write_arg(ids.all_actions.address_, [
            # State: NEXT_ITERATION (replaces "3" with "1" and "4" with "2" for the next iteration).
            MOVE_LEFT, 3, SEARCH_NEXT,
            MOVE_RIGHT, 1, SEARCH_NEXT,  # Initialization.
            *DONT_CARE,
            MOVE_RIGHT, 1, NEXT_ITERATION,  # Replace "3" with "1".
            MOVE_RIGHT, 2, NEXT_ITERATION,  # Replace "4" with "2".
            *DONT_CARE,
            *DONT_CARE,

            # State: WRITE4 (writes "4" at the next empty slot).
            MOVE_RIGHT, 4, SEARCH_NEXT,  # Write "4" and move to SEARCH_NEXT.
            *DONT_CARE,
            *DONT_CARE,
            MOVE_RIGHT, 3, WRITE4,  # Ignore.
            MOVE_RIGHT, 4, WRITE4,  # Ignore.
            *DONT_CARE,
            *DONT_CARE,

            # State: SEARCH_NEXT (searches for "2" and replaces it with "4").
            MOVE_LEFT, 4, SEARCH_NEXT,  # Write the second 4 and then start the search.
            MOVE_RIGHT, 1, NEXT_ITERATION,  # No more ones, move to NEXT_ITERATION.
            MOVE_RIGHT, 4, WRITE4,  # Found "2", move to WRITE4.
            MOVE_LEFT, 3, SEARCH_NEXT,  # Ignore.
            MOVE_LEFT, 4, SEARCH_NEXT,  # Ignore.
            *DONT_CARE,
            *DONT_CARE,
        ])
    %}

    let n_actions = VALUE_BOUND * AMOUNT
    let (range_check_ptr) = check_actions(
        range_check_ptr=range_check_ptr, all_actions=all_actions, n_actions=n_actions, i=n_actions)

    # An infinite list of zeros.
    let (local list : List*) = alloc()
    assert list.tail = list
    assert list.head = 0

    # The initial tape is:
    # ...00010000...
    #       ^
    # and the initial state is the first state.
    let (local context : Context*) = alloc()
    assert context.list1 = list
    assert context.list2 = list
    assert context.value = 1
    assert context.state = all_actions

    local length
    %{ ids.length = 376 %}
    let (local range_check_ptr) = assert_nn_le(range_check_ptr, length, 600)
    let (context) = run(context, length)
    %{
        res = ''
        x = ids.context.list1
        for i in range(36):
            res += str(memory[x])
            x = memory[x + 1]
        print(f'Result: {res[::-1]}')

        memory[ids.output_ptr] = 0x1234
    %}
    # Check that the final result is 121221222212222222212222222222222222 (the binary representation
    # of 24662441983 is 0b010110111101111111101111111111111111).
    validate(context.list1, 24662441983, 36)

    return (output_ptr=output_ptr + 1, range_check_ptr=range_check_ptr)
end
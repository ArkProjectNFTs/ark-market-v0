//! Orders database.
//!
//! The only assumption for now is that,
//! a single order serialized buffer must not exceed
//! 256 felts.
use array::{ArrayTrait, SpanTrait};
use serde::Serde;
use option::OptionTrait;
use traits::{Into, TryInto};
use starknet::SyscallResultTrait;

use arkchain::order::OrderStatus;

// Must remain equal to 0 for now.
const ADDRESS_DOMAIN: u32 = 0;
const ORDER_DB_BASE_KEY: felt252 = 'order database';

/// Reads an order from the database (storage).
fn order_read<T, impl TSerde: Serde<T>, impl TDrop: Drop<T>>(
    order_hash: felt252
) -> (Option<OrderStatus>, Option<T>) {
    let key = array![ORDER_DB_BASE_KEY, order_hash];

    let base = starknet::storage_base_address_from_felt252(
        poseidon::poseidon_hash_span(key.span())
    );

    // First offset is the status.
    let status: felt252 = starknet::storage_read_syscall(
        ADDRESS_DOMAIN,
        starknet::storage_address_from_base_and_offset(base, 0)
    )
        .unwrap_syscall();

    // Then, we must read the length to iterate over the offsets due to how
    // span is serialized.
    let length: felt252 = starknet::storage_read_syscall(
        ADDRESS_DOMAIN,
        starknet::storage_address_from_base_and_offset(base, 1)
    )
        .unwrap_syscall();

    let mut offset = 2;
    let mut value = array![length];

    loop {
        // -1 as the first offset was the length, already processed.
        if length == offset.into() - 1 {
            break ();
        }

        value
            .append(
                starknet::storage_read_syscall(
                    ADDRESS_DOMAIN,
                    starknet::storage_address_from_base_and_offset(
                        base,
                        offset)
                )
                    .unwrap_syscall()
            );

        offset += 1;
    };

    let mut vspan = value.span();
    (status.try_into(), Serde::<T>::deserialize(ref vspan))
}

/// Writes an order into the database (storage), with the status "Open".
fn order_write<T, impl TSerde: Serde<T>, impl TDrop: Drop<T>>(
    order_hash: felt252,
    order: T
) {
    let key = array![ORDER_DB_BASE_KEY, order_hash];

    let base = starknet::storage_base_address_from_felt252(
        poseidon::poseidon_hash_span(key.span())
    );

    // At offset 0, we have the status.
    starknet::storage_write_syscall(
        ADDRESS_DOMAIN,
        starknet::storage_address_from_base_and_offset(base, 0),
        OrderStatus::Open.into()
    );

    let mut offset = 1;

    // At offset 1, we always have the length, as it's how
    // a span is serialized, followed by the content.
    let mut buf = array![];
    order.serialize(ref buf);

    loop {
        match buf.pop_front() {
            Option::Some(v) => {
                starknet::storage_write_syscall(
                    ADDRESS_DOMAIN,
                    starknet::storage_address_from_base_and_offset(base, offset),
                    v
                );
                offset += 1
            },
            Option::None(_) => {
                break ();
            },
        };
    };
}

/// Reads only the status of the given order.
fn order_status_read(order_hash: felt252) -> Option<OrderStatus> {
    let key = array![ORDER_DB_BASE_KEY, order_hash];

    let base = starknet::storage_base_address_from_felt252(
        poseidon::poseidon_hash_span(key.span())
    );

    // First offset is the status.
    let status: felt252 = starknet::storage_read_syscall(
        ADDRESS_DOMAIN,
        starknet::storage_address_from_base_and_offset(base, 0)
    )
        .unwrap_syscall();

    status.try_into()
}

/// Writes only the status of the given order. Will fail
/// if the order is not already written with a valid status.
fn order_status_write(order_hash: felt252, status: OrderStatus) -> bool {
    let db_status = order_status_read(order_hash);

    if db_status.is_none() {
        return false;
    }

    let key = array![ORDER_DB_BASE_KEY, order_hash];

    let base = starknet::storage_base_address_from_felt252(
        poseidon::poseidon_hash_span(key.span())
    );

    // At offset 0, we have the status.
    starknet::storage_write_syscall(
        ADDRESS_DOMAIN,
        starknet::storage_address_from_base_and_offset(base, 0),
        status.into()
    );

    true
}

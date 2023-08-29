config := --account ./data/katana_account.json --keystore ./data/katana_key.json --rpc http://0.0.0.0:4040 --keystore-password 1234

ob_cl := $(shell starkli class-hash target/dev/arkchain_orderbook.sierra.json)
ob_addr := 0x0673a41aea759cff940534d0b52784d9ecb68d2a8e2d5c67f92faff9bc9ba22a

ark_executor_sn := 0x0735ee89ead07b4fcc46ed2d474b7e9748d9405b56f0c5566e287cd2fd395bff

setup:
	starkli declare target/dev/arkchain_orderbook.sierra.json ${config}
	starkli deploy ${ob_cl} 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 ${config} --salt 0x1234
	starkli invoke ${ob_addr} set_executor_sn_address ${ark_executor_sn} ${config}

katana:
	@echo ./target/release/katana -p 4040 \
	--messaging-rpc-url http://localhost:5050 \
	--messaging-contract-address 0x074aab826c6e94de492b89ce62fc6da1cf8e7c72f07a5c01c09a780f1b002ebb \
	--messaging-sender-address 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 \
	--messaging-private-key 0x300001800000000300000180000000000030000000000003006001800006600 \
	--messaging-fetch-interval 10 \
	--messaging-from-block-settlement 0

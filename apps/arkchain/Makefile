config := --account ./data/katana_account.json --keystore ./data/katana_key.json --rpc http://0.0.0.0:4040 --keystore-password 1234

ob_cl := $(shell starkli class-hash target/dev/arkchain_orderbook.sierra.json)
ob_addr := 0x038ddb750e8fc55b2e80d2f2568e95878b5657b71e7f340958000d6bf7519f5b

ark_executor_sn := 0x0735ee89ead07b4fcc46ed2d474b7e9748d9405b56f0c5566e287cd2fd395bff

# Katana accounts
# has token 1 and 2
katana_2 := 0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c
# has token 3 and 4
katana_3 := 0x1d98d835e43b032254ffbef0f150c5606fa9c5c9310b1fae370ab956a7919f5
# collection
erc721_address := 0x044b07a8c955296dd52a9d7d31a400b16ad4f6f574aa57db79cac0e87eac48cd

setup:
	starkli declare target/dev/arkchain_orderbook.sierra.json ${config}
	starkli deploy ${ob_cl} 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 ${config} --salt 0x1234
	starkli invoke ${ob_addr} set_executor_sn_address ${ark_executor_sn} ${config}

	starkli invoke ${ob_addr} register_broker str:b1 1 str:starknet_testnet ${config}

	starkli invoke ${ob_addr} add_order_listing ${katana_2} ${erc721_address} u256:1 u256:77 0 str:b1 0 0 ${config}

	starkli invoke ${ob_addr} submit_order_buy 0x51a397add04213bb487668b635bedefdbbe5fb8f5b9d3aad6164031b60958b ${katana_3} str:b1 0 0 ${config}

katana:
	@echo ./target/release/katana -p 4040 \
	--messaging-rpc-url http://localhost:5050 \
	--messaging-contract-address 0x074aab826c6e94de492b89ce62fc6da1cf8e7c72f07a5c01c09a780f1b002ebb \
	--messaging-sender-address 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 \
	--messaging-private-key 0x300001800000000300000180000000000030000000000003006001800006600 \
	--messaging-fetch-interval 10 \
	--messaging-from-block-settlement 0

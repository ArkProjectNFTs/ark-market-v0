config := --account ../arkchain/data/katana_account.json --keystore ../arkchain/data/katana_key.json --rpc http://0.0.0.0:5050 --keystore-password 1234
rpc := --rpc http://0.0.0.0:5050

# Katana account #1
admin_addr := 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
# TODO: replace with the katana of the arkchain.
appchain_seq := 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0
appchain_orderbook := 0x02ac07491203f958711ec6ee94e0fc07aaf9d9fe0df5ffc95e0c99b975791a56
# Always the same due to the salt in the deploy of ERC20
erc20_address := 0x014f169b34ed8cc0b47da58b97af46ebbdb9667fb0c71974b4ca3c19c9e89d9c
erc721_address := 0x044b07a8c955296dd52a9d7d31a400b16ad4f6f574aa57db79cac0e87eac48cd
messaging_address := 0x074aab826c6e94de492b89ce62fc6da1cf8e7c72f07a5c01c09a780f1b002ebb
executor_address := 0x0573e38d2b37032172a1f9b370bd81954a0d44934e38154ff75a678700b73430

# Katana accounts
katana_2 := 0x33c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c
katana_3 := 0x1d98d835e43b032254ffbef0f150c5606fa9c5c9310b1fae370ab956a7919f5

executor_cl := $(shell starkli class-hash target/dev/ark_executor_executor.sierra.json)
erc721_ll_cl := $(shell starkli class-hash target/dev/ark_executor_erc721_longstring.sierra.json)
erc721_mini_cl := $(shell starkli class-hash target/dev/ark_executor_erc721_mini.sierra.json)
erc20_cl := $(shell starkli class-hash target/dev/ark_executor_ERC20.sierra.json)
messaging_cl := $(shell starkli class-hash target/dev/ark_executor_appchain_messaging.sierra.json)

setup:
	starkli declare target/dev/ark_executor_executor.sierra.json ${config}
	starkli declare target/dev/ark_executor_erc721_longstring.sierra.json ${config}
	starkli declare target/dev/ark_executor_erc721_mini.sierra.json ${config}
	starkli declare target/dev/ark_executor_ERC20.sierra.json ${config}
	starkli declare target/dev/ark_executor_appchain_messaging.sierra.json ${config}

	@echo "\n**ERC20**\n"
	starkli deploy --salt 0x1234 ${erc20_cl} str:eth str:ETH u256:0x999999999 ${admin_addr} ${config}
	starkli call ${erc20_address} balance_of ${admin_addr} ${rpc}
	starkli invoke ${erc20_address} transfer ${katana_2} u256:0x99 ${config}
	starkli invoke ${erc20_address} transfer ${katana_3} u256:0x99 ${config}

	@echo "\n**ERC721**\n"
	starkli deploy --salt 0x5678 ${erc721_mini_cl} str:c1 str:C1 ${config}
	starkli invoke ${erc721_address} mint_free ${katana_2} u256:1 ${config}
	starkli invoke ${erc721_address} mint_free ${katana_2} u256:2 ${config}
	starkli invoke ${erc721_address} mint_free ${katana_3} u256:3 ${config}
	starkli invoke ${erc721_address} mint_free ${katana_3} u256:4 ${config}

	@echo "\n ** MESSAGING **\n"
	starkli deploy --salt 0x7777 ${messaging_cl} ${admin_addr} ${appchain_seq} ${config}

	@echo "\n**EXECUTOR**\n"
	starkli deploy --salt 0x9123 ${executor_cl} ${admin_addr} ${appchain_seq} ${appchain_orderbook} ${erc20_address} ${messaging_address} ${config}

	# Must be done by messaging. Here for manual testing only.
	# starkli invoke ${executor_address} execute_buy_order 0xaabb ${erc721_address} u256:1 ${katana_2} ${katana_3} u256:0x1 ${config}

	# starkli call ${erc20_address} balance_of ${admin_addr} ${rpc}
	# starkli call ${erc20_address} balance_of ${katana_2} ${rpc}
	# starkli call ${erc20_address} balance_of ${katana_3} ${rpc}

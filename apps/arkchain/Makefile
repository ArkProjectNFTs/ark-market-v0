config := --account ./data/katana_account.json --keystore ./data/katana_key.json --rpc http://0.0.0.0:5050

setup:
	starkli declare target/dev/arkchain_orderbook.sierra.json ${config}
	starkli deploy 0x01b53b3a85b53de0b17d25fecd827a4c6ab09c4b09489e04707be8df1b720e0c 0x3ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0 0x1234 ${config}

import { expect } from "chai";
import { starknet } from "hardhat";
import { TIMEOUT } from "./constants";
import { StarknetContractFactory } from "hardhat/types/runtime";
import { getPredeployedOZAccount } from "./util";
import { OpenZeppelinAccount } from "@shardlabs/starknet-hardhat-plugin/dist/src/account";
import { StarknetContract } from "@shardlabs/starknet-hardhat-plugin/dist/src/types";
import { uint256, number } from "starknet";
describe("Devnet mint", function () {
  this.timeout(TIMEOUT);
  let tokenContractFactory: StarknetContractFactory;
  let orderBookContractFactory: StarknetContractFactory;
  let account: OpenZeppelinAccount;
  let tokenContract: StarknetContract;
  let orderBookContract: StarknetContract;

  const tokenId = 1;

  before(async function () {
    account = await getPredeployedOZAccount();
    // deploy sample_token contract
    tokenContractFactory = await starknet.getContractFactory("sample_token");
    await account.declare(tokenContractFactory);
    tokenContract = await account.deploy(tokenContractFactory, {
      owner: account.address
    });
    // deploy orderbook contract
    orderBookContractFactory = await starknet.getContractFactory("orderbook");
    await account.declare(orderBookContractFactory);
    orderBookContract = await account.deploy(orderBookContractFactory);
  });

  it("should have address", async () => {
    const { address } = account;
    expect(typeof address).to.be.eq("string");
    expect(address.indexOf("0x")).to.be.eq(0);
  });

  // test mint a token on sample_token contract
  it("should mint a token", async () => {
    const { address } = account;

    await account.invoke(tokenContract, "safeMint", {
      to: address,
      tokenId: uint256.bnToUint256(tokenId),
      data: [1],
      tokenURI: 0
    });
    const res = await tokenContract.call("ownerOf", {
      token_id: uint256.bnToUint256(tokenId)
    });
    const owner = number.toHexString(res.owner);
    expect(address).to.equal(owner);
  });

  it("should create an order for the minted nft", async () => {
    const test1 = await account.invoke(orderBookContract, "create_listing", {
      contract_address: tokenContract.address,
      owner: account.address,
      token_id: uint256.bnToUint256(tokenId),
      price: 1000000000000000000
    });
    const val1 = await orderBookContract.call("get_listing", {
      idx: 1
    });
    const test2 = await account.invoke(orderBookContract, "create_listing", {
      contract_address: tokenContract.address,
      owner: account.address,
      token_id: uint256.bnToUint256(tokenId),
      price: 1000000000000000000
    });

    const val2 = await orderBookContract.call("get_listing", {
      idx: 2
    });

    console.log(tokenContract.address);
    console.log(val1);
    console.log(val2);
    console.log(test1);
    console.log(test2);
    console.log("create order");
  });
});

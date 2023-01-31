const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet Contract Unit Tests", function () {
  async function deployEtherWalletFixture() {
    const etherWalletFactory = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await etherWalletFactory.deploy();
    await etherWallet.deployed();
    return { etherWallet };
  }

  it("should return the correct balance", async function () {
    const balance = await etherWallet.getBalance();
    const actualBalance = await ethers.provider.getBalance(etherWallet.address);
    expect(balance).to.equal(actualBalance.toString());
  });
});

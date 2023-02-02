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
});

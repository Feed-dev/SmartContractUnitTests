const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Payable Contract", function () {
  let payable;
  let owner;

  async function deployPayableFixture() {
    const payableFactory = await ethers.getContractFactory("Payable");
    payable = await payableFactory.deploy();
    await payable.deployed();
    owner = await payable.owner();
    return { payable };
  }

  it("should have the correct owner address", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    expect(await payable.owner()).to.equal(owner);
  });
});

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FunctionModifier Unit Tests", function () {
  async function deployFunctionModifierFixture() {
    const functionModifierFactory = await ethers.getContractFactory(
      "FunctionModifier"
    );
    const functionModifierContract = await functionModifierFactory.deploy();
    await functionModifierContract.deployed();
    return { functionModifierFactory, functionModifierContract };
  }

  it("should allow the owner to change the owner address", async function () {
    const { functionModifierContract } = await loadFixture(
      deployFunctionModifierFixture
    );
    const newOwner = ethers.Wallet.createRandom().address;
    await functionModifierContract.changeOwner(newOwner);
    expect(await functionModifierContract.owner()).to.equal(newOwner);
  });

  it("should not allow the owner to change the owner address to the zero address", async function () {
    const { functionModifierContract } = await loadFixture(
      deployFunctionModifierFixture
    );
    await expect(
      functionModifierContract.changeOwner(ethers.constants.AddressZero)
    ).to.be.rejectedWith("Not valid address");
  });
});

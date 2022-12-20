const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Gas contract", function () {
  async function deployGasFixture() {
    const gasFactory = await ethers.getContractFactory("Gas");
    const gas = await gasFactory.deploy();
    await gas.deployed();
    return { gasFactory, gas };
  }
  // test for a transaction failure
  it("should revert the function call", async function () {
    const { gas } = await loadFixture(deployGasFixture);
    await expect(gas.countDown()).to.be.revertedWith("Out of fake gas");
  });
});

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Error Unit Tests", function () {
  async function deployErrorFixture() {
    const errorFactory = await ethers.getContractFactory("Error");
    const errorContract = await errorFactory.deploy();
    await errorContract.deployed();
    return { errorFactory, errorContract };
  }

  it("should throw an error when calling testRequire with an input value <= 10", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testRequire(9)).to.be.rejectedWith(
      "Input must be greater than 10"
    );
  });

  it("should not throw an error when calling testRequire with an input value > 10", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testRequire(11)).to.be.fulfilled;
  });

  it("should throw an error when calling testRevert with an input value <= 10", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testRevert(9)).to.be.rejectedWith(
      "Input must be greater than 10"
    );
  });

  it("should not throw an error when calling testRevert with an input value > 10", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testRevert(11)).to.be.fulfilled;
  });

  it("should throw a custom error when calling testCustomError with an insufficient balance", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testCustomError(1)).to.be.rejectedWith(
      "InsufficientBalance"
    );
  });

  it("should not throw an error when calling testCustomError with a sufficient balance", async function () {
    const { errorContract } = await loadFixture(deployErrorFixture);
    await expect(errorContract.testCustomError(0)).to.be.fulfilled;
  });
});

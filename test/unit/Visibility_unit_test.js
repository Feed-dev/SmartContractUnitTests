const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Base Contract", function () {
  async function deployBaseFixture() {
    const baseFactory = await ethers.getContractFactory("Base");
    const base = await baseFactory.deploy();
    await base.deployed();
    return { base };
  }

  it("should return the correct message when calling the private function", async function () {
    const { base } = await loadFixture(deployBaseFixture);
    const result = await base.testPrivateFunc();
    expect(result).to.equal("private function called");
  });

  it("should return the correct message when calling the internal function", async function () {
    const { base } = await loadFixture(deployBaseFixture);
    const result = await base.testInternalFunc();
    expect(result).to.equal("internal function called");
  });

  it("should return the correct message when calling the public function", async function () {
    const { base } = await loadFixture(deployBaseFixture);
    const result = await base.publicFunc();
    expect(result).to.equal("public function called");
  });

  it("should revert when calling the external function", async function () {
    const { base } = await loadFixture(deployBaseFixture);
    await expect(base.externalFunc()).to.be.reverted;
  });
});

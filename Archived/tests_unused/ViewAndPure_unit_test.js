const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ViewAndPure Unit Tests", function () {
  async function deployViewAndPureFixture() {
    const viewAndPureFactory = await ethers.getContractFactory("ViewAndPure");
    const viewAndPureContract = await viewAndPureFactory.deploy();
    await viewAndPureContract.deployed();
    return { viewAndPureFactory, viewAndPureContract };
  }

  it("should return the correct result when calling addToX", async function () {
    const { viewAndPureContract } = await loadFixture(deployViewAndPureFixture);
    const result = await viewAndPureContract.addToX(5);
    expect(result).to.equal(6);
  });

  it("should return the correct result when calling add", async function () {
    const { viewAndPureContract } = await loadFixture(deployViewAndPureFixture);
    const result = await viewAndPureContract.add(5, 7);
    expect(result).to.equal(12);
  });
});

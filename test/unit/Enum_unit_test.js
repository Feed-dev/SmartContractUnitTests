const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Enum Unit Tests", function () {
  async function deployEnumFixture() {
    const enumFactory = await ethers.getContractFactory("Enum");
    const enumInstance = await enumFactory.deploy();
    await enumInstance.deployed();
    return { enumFactory, enumInstance };
  }

  it("should return the correct status when it is set to Pending", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await enumInstance.set(0);
    expect(await enumInstance.get()).to.equal(0);
  });

  it("should return the correct status when it is set to Shipped", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await enumInstance.set(1);
    expect(await enumInstance.get()).to.equal(1);
  });

  it("should update the status to the correct value when called with a valid enum value", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await enumInstance.set(2);
    expect(await enumInstance.get()).to.equal(2);
  });

  it("should revert when called with an invalid enum value", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await expect(enumInstance.set(5)).to.be.reverted;
  });

  it("should update the status to Canceled", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await enumInstance.set(4);
    expect(await enumInstance.get()).to.equal(4);
  });

  it("should reset the status to Pending", async function () {
    const { enumInstance } = await loadFixture(deployEnumFixture);
    await enumInstance.set(1);
    await enumInstance.reset();
    const status = await enumInstance.get();
    expect(await enumInstance.get()).to.equal(0);
  });
});

const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("G Unit Tests", function () {
  async function deployGFixture() {
    const GFactory = await ethers.getContractFactory("G");
    const G = await GFactory.deploy();
    await G.deployed();
    return { GFactory, G };
  }

  it("should return the correct name when calling getName()", async function () {
    const { G } = await loadFixture(deployGFixture);
    const result = await G.getName();
    expect(result).to.equal("Contract G");
  });
});

describe("H Unit Tests", function () {
  async function deployHFixture() {
    const HFactory = await ethers.getContractFactory("H");
    const H = await HFactory.deploy();
    await H.deployed();
    return { HFactory, H };
  }

  it("should return the correct name when calling getName()", async function () {
    const { H } = await loadFixture(deployHFixture);
    const result = await H.getName();
    expect(result).to.equal("Contract H");
  });
});

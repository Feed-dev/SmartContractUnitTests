const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("IfElse", function () {
  async function deployIfElseFixture() {
    const ifelseFactory = await ethers.getContractFactory("IfElse");
    const ifelse = await ifelseFactory.deploy();
    await ifelse.deployed();
    return { ifelseFactory, ifelse };
  }
  it("should return 0 if x < 10", async function () {
    const { ifelse } = await loadFixture(deployIfElseFixture);
    const currentState = await ifelse.foo(9);
    const expectedState = "0";
    assert.equal(currentState.toString(), expectedState);
  });
  it("should return 1 if 10 <= x < 20", async function () {
    const { ifelse } = await loadFixture(deployIfElseFixture);
    const currentState = await ifelse.foo(11);
    const expectedState = "1";
    assert.equal(currentState.toString(), expectedState);
  });
  it("should return 2 if x >= 20", async function () {
    const { ifelse } = await loadFixture(deployIfElseFixture);
    const currentState = await ifelse.foo(22);
    const expectedState = "2";
    assert.equal(currentState.toString(), expectedState);
  });
});

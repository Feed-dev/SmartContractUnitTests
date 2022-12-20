const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage Contract", function () {
  async function deploySimpleStorageFixture() {
    const storageFactory = await ethers.getContractFactory("SimpleStorage");
    const storage = await storageFactory.deploy();
    await storage.deployed();
    await storage.set(10);
    return { storageFactory, storage };
  }
  it("should set the state variable", async function () {
    const { storage } = await loadFixture(deploySimpleStorageFixture);
    await storage.set(5);
    const currentState = await storage.get();
    const expectedState = "5";
    assert.equal(currentState.toString(), expectedState);
  });
  it("should read from state variable", async function () {
    const { storage } = await loadFixture(deploySimpleStorageFixture);
    const currentState = await storage.get();
    const expectedState = "10";
    assert.equal(currentState.toString(), expectedState);
  });
});

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Mapping Contract", function () {
  async function deployMappingFixture() {
    const mappingFactory = await ethers.getContractFactory("Mapping");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const mapping = await mappingFactory.deploy();
    await mapping.deployed();
    await mapping.set(owner.address, 1);
    return { mappingFactory, mapping, owner, addr1, addr2 };
  }
  it("should get the address value", async function () {
    const { mapping, owner } = await loadFixture(deployMappingFixture);
    const currentState = await mapping.get(owner.address);
    const expectedState = "1";
    assert.equal(currentState.toString(), expectedState);
  });
  it("should set the address value to 10 ", async function () {
    const { mapping, owner } = await loadFixture(deployMappingFixture);
    await mapping.set(owner.address, 10);
    const currentState = await mapping.get(owner.address);
    const expectedState = "10";
    assert.equal(currentState.toString(), expectedState);
  });
  it("should reset the address value to default ", async function () {
    const { mapping, owner } = await loadFixture(deployMappingFixture);
    await mapping.remove(owner.address);
    const currentState = await mapping.get(owner.address);
    const expectedState = "0";
    assert.equal(currentState.toString(), expectedState);
  });
});

describe("NestedMapping Contract", function () {
  async function deployNestedMappingFixture() {
    const nestedMappingFactory = await ethers.getContractFactory(
      "NestedMapping"
    );
    const [owner] = await ethers.getSigners();
    const nestedMapping = await nestedMappingFactory.deploy();
    await nestedMapping.deployed();
    return { nestedMappingFactory, nestedMapping, owner };
  }

  it("should get the default value for an uninitialized inner mapping", async function () {
    const { nestedMapping, owner } = await loadFixture(
      deployNestedMappingFixture
    );
    const currentState = await nestedMapping.get(owner.address, 0);
    const expectedState = false;
    assert.equal(currentState, expectedState);
  });

  it("should set and get the value in an inner mapping", async function () {
    const { nestedMapping, owner } = await loadFixture(
      deployNestedMappingFixture
    );
    await nestedMapping.set(owner.address, 0, true);
    const currentState = await nestedMapping.get(owner.address, 0);
    const expectedState = true;
    assert.equal(currentState, expectedState);
  });

  it("should remove the value in an inner mapping", async function () {
    const { nestedMapping, owner } = await loadFixture(
      deployNestedMappingFixture
    );
    await nestedMapping.set(owner.address, 0, true);
    await nestedMapping.remove(owner.address, 0);
    const currentState = await nestedMapping.get(owner.address, 0);
    const expectedState = false;
    assert.equal(currentState, expectedState);
  });
});

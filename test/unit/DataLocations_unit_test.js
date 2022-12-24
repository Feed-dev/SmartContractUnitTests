const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Data Locations Unit Tests", function () {
  async function deployDataLocationsFixture() {
    const dataLocationsFactory = await ethers.getContractFactory(
      "DataLocations"
    );
    const dataLocations = await dataLocationsFactory.deploy();
    await dataLocations.deployed();
    return { dataLocationsFactory, dataLocations };
  }

  it("should call internal function with storage variables", async function () {
    const { dataLocations } = await loadFixture(deployDataLocationsFixture);
    await dataLocations.f();
  });

  it("should do something with calldata array", async function () {
    const { dataLocations } = await loadFixture(deployDataLocationsFixture);
    const calldataArray = [4, 5, 6];
    await dataLocations.h(calldataArray);
  });
});

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Math Library Unit Tests", function () {
  async function deployMathLibraryFixture() {
    const testMathFactory = await ethers.getContractFactory("TestMath");
    const testMath = await testMathFactory.deploy();
    await testMath.deployed();
    return { testMath };
  }

  it("should return the correct square root of 9", async function () {
    const { testMath } = await loadFixture(deployMathLibraryFixture);
    const result = await testMath.testSquareRoot(9);
    expect(result.toString()).to.equal("3");
  });

  it("should return the correct square root of 16", async function () {
    const { testMath } = await loadFixture(deployMathLibraryFixture);
    const result = await testMath.testSquareRoot(16);
    expect(result.toString()).to.equal("4");
  });
});

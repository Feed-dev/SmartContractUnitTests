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

describe("Array Library Unit Tests", function () {
  async function deployArrayLibraryFixture() {
    const testArrayFactory = await ethers.getContractFactory("TestArray");
    const testArray = await testArrayFactory.deploy();
    await testArray.deployed();
    return { testArray };
  }

  it("should remove the element at index 1 and re-organize the array correctly", async function () {
    const { testArray } = await loadFixture(deployArrayLibraryFixture);
    await testArray.testArrayRemove();
    const arr = await testArray.arr();
    expect(arr.length).to.equal(2);
    expect(arr[0]).to.equal("0");
    expect(arr[1]).to.equal("2");
  });

  it("should throw an error when trying to remove an element from an empty array", async function () {
    const { testArray } = await loadFixture(deployArrayLibraryFixture);
    await expect(testArray.testArrayRemove()).to.be.rejectedWith(
      "Can't remove from empty array"
    );
  });
});

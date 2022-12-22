const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Array Contract", function () {
  async function deployArrayFixture() {
    const arrayFactory = await ethers.getContractFactory("Array");
    const array = await arrayFactory.deploy();
    await array.deployed();
    return { arrayFactory, array };
  }

  it("should get the element at a given index", async function () {
    const { array } = await loadFixture(deployArrayFixture);
    await array.push(10);
    const currentState = await array.get(0);
    const expectedState = 10;
    assert.equal(currentState, expectedState);
  });

  it("should get the entire array", async function () {
    const { array } = await loadFixture(deployArrayFixture);
    await array.push(10);
    await array.push(20);
    const currentState = await array.getArr();
    const expectedState = [10, 20];
    assert.deepEqual(
      currentState.map((x) => x.toNumber()),
      expectedState
    );
  });

  it("should increase the array length by 1 when pushing an element", async function () {
    const { array } = await loadFixture(deployArrayFixture);
    const currentLength = await array.getLength();
    await array.push(10);
    const newLength = await array.getLength();
    assert.equal(newLength.toNumber(), currentLength + 1);
  });

  it("should decrease the array length by 1 when popping an element", async function () {
    const { array } = await loadFixture(deployArrayFixture);
    await array.push(10);
    const currentLength = await array.getLength();
    await array.pop();
    const newLength = await array.getLength();
    assert.equal(newLength, currentLength - 1);
  });

  it("should reset the value at a given index to the default value when removing it", async function () {
    const { array } = await loadFixture(deployArrayFixture);
    await array.push(10);
    await array.remove(0);
    const currentState = await array.get(0);
    const expectedState = 0;
    assert.equal(currentState, expectedState);
  });
});

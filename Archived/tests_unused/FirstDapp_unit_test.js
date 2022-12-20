const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Counter contract", function () {
  let counterFactory, counter;
  beforeEach(async function () {
    counterFactory = await ethers.getContractFactory("Counter");
    counter = await counterFactory.deploy();
  });
  it("should get the current count", async function () {
    const currentCount = await counter.get();
    const expectedCount = 0;
    assert.equal(currentCount, expectedCount);
  });
  it("should increment count by 1", async function () {
    await counter.inc();
    const currentCount = await counter.get();
    const expectedCount = 1;
    assert.equal(currentCount, expectedCount);
  });
  it("should decrement count by 1", async function () {
    await counter.inc();
    await counter.inc();
    await counter.dec();
    const currentCount = await counter.get();
    const expectedCount = 1;
    assert.equal(currentCount, expectedCount);
  });
});

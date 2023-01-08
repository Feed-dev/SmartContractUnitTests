const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Counter Contract", function () {
  async function deployCounterFixture() {
    const counterFactory = await ethers.getContractFactory("Counter");
    const counter = await counterFactory.deploy();
    await counter.deployed();
    return { counter };
  }

  it("should have a count of 0 when deployed", async function () {
    const { counter } = await loadFixture(deployCounterFixture);
    const count = await counter.count();
    expect(count).to.equal(0);
  });

  it("should increment the count by 1 when the increment function is called", async function () {
    const { counter } = await loadFixture(deployCounterFixture);
    await counter.increment();
    const count = await counter.count();
    expect(count).to.equal(1);
  });
});

describe("MyContract Contract", function () {
  async function deployMyContractFixture() {
    const myContractFactory = await ethers.getContractFactory("MyContract");
    const myContract = await myContractFactory.deploy();
    await myContract.deployed();

    const counterFactory = await ethers.getContractFactory("Counter");
    const counter = await counterFactory.deploy();
    await counter.deployed();

    return { myContract, counter };
  }

  it("should increment the counter's count by 1 when the incrementCounter function is called", async function () {
    const { myContract, counter } = await loadFixture(deployMyContractFixture);
    await myContract.incrementCounter(counter.address);
    const count = await myContract.getCount(counter.address);
    expect(count).to.equal(1);
  });

  it("should get the correct count from the counter when the getCount function is called", async function () {
    const { myContract, counter } = await loadFixture(deployMyContractFixture);
    await myContract.incrementCounter(counter.address);
    await myContract.incrementCounter(counter.address);
    const count = await myContract.getCount(counter.address);
    expect(count).to.equal(2);
  });
});

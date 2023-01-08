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

describe("UniswapExample Contract", function () {
  async function deployUniswapExampleFixture() {
    const uniswapExampleFactory = await ethers.getContractFactory(
      "UniswapExample"
    );
    const uniswapExample = await uniswapExampleFactory.deploy();
    await uniswapExample.deployed();
    return { uniswapExample };
  }

  it("should get the correct token reserves when the getTokenReserves function is called", async function () {
    const { uniswapExample } = await loadFixture(deployUniswapExampleFixture);
    const [reserve0, reserve1] = await uniswapExample.getTokenReserves();
    // Test that the returned values are correct
    expect(reserve0).to.be.a.bignumber.that.is.above(0);
    expect(reserve1).to.be.a.bignumber.that.is.above(0);
  });
});

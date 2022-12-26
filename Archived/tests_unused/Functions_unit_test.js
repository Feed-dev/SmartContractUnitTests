const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Function Unit Tests", function () {
  async function deployFunctionFixture() {
    const functionFactory = await ethers.getContractFactory("Function");
    const functionContract = await functionFactory.deploy();
    await functionContract.deployed();
    return { functionFactory, functionContract };
  }

  it("should return the correct values when calling returnMany", async function () {
    const { functionContract } = await loadFixture(deployFunctionFixture);
    const [i, b, j] = await functionContract.returnMany();
    expect(i).to.equal(1);
    expect(b).to.be.true;
    expect(j).to.equal(2);
  });

  it("should return the correct values when calling named", async function () {
    const { functionContract } = await loadFixture(deployFunctionFixture);
    const { x, b, y } = await functionContract.named();
    expect(x).to.equal(1);
    expect(b).to.be.true;
    expect(y).to.equal(2);
  });

  it("should return the correct values when calling assigned", async function () {
    const { functionContract } = await loadFixture(deployFunctionFixture);
    const { x, b, y } = await functionContract.assigned();
    expect(x).to.equal(1);
    expect(b).to.be.true;
    expect(y).to.equal(2);
  });

  it("should return the correct values when calling destructuringAssignments", async function () {
    const { functionContract } = await loadFixture(deployFunctionFixture);
    const [i, b, j, x, y] = await functionContract.destructuringAssignments();
    expect(i).to.equal(1);
    expect(b).to.be.true;
    expect(j).to.equal(2);
    expect(x).to.equal(4);
    expect(y).to.equal(6);
  });

  it("should accept an array as input when calling arrayInput", async function () {
    const { functionContract } = await loadFixture(deployFunctionFixture);
    const inputArray = [1, 2, 3];
    await functionContract.arrayInput(inputArray);
  });
});

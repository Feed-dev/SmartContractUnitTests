const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Caller Contract", function () {
  async function deployCallerFixture() {
    const calleeFactory = await ethers.getContractFactory("Callee");
    const callee = await calleeFactory.deploy();
    await callee.deployed();

    const callerFactory = await ethers.getContractFactory("Caller");
    const caller = await callerFactory.deploy();
    await caller.deployed();

    return { calleeFactory, callerFactory, caller, callee };
  }
});
it("should set the value of x in the callee contract to the correct value when calling setX", async function () {
  const { caller, callee } = await loadFixture(deployCallerFixture);
  await caller.setX(callee.address, 5);
  const x = await callee.x();
  expect(x).to.equal(5);
});

it("should set the value of x in the callee contract to the correct value when calling setXFromAddress", async function () {
  const { caller, callee } = await loadFixture(deployCallerFixture);
  await caller.setXFromAddress(callee.address, 7);
  const x = await callee.x();
  expect(x).to.equal(7);
});

it("should set the x value of the callee contract when calling setX", async function () {
  const { callee, caller } = await loadFixture(deployCallerFixture);
  await caller.setX(callee.address, 5);
  expect(await callee.x()).to.equal(5);
});

it("should set the x value of the callee contract when calling setXFromAddress", async function () {
  const { callee, caller } = await loadFixture(deployCallerFixture);
  await caller.setXFromAddress(callee.address, 7);
  expect(await callee.x()).to.equal(7);
});

it("should set the x value and send ether to the callee contract when calling setXandSendEther", async function () {
  const { callee, caller } = await loadFixture(deployCallerFixture);
  const initialBalance = await ethers.provider.getBalance(callee.address);
  await caller.setXandSendEther(callee.address, 10, {
    value: ethers.utils.parseEther("1.0"),
  });
  expect(await callee.x()).to.equal(10);
  expect(await callee.value()).to.equal(ethers.utils.parseEther("1.0"));
  expect(await ethers.provider.getBalance(callee.address)).to.equal(
    initialBalance.add(ethers.utils.parseEther("1.0"))
  );
});

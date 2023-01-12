const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Fallback Contract", function () {
  async function deployFallbackFixture() {
    const fallbackFactory = await ethers.getContractFactory("Fallback");
    const fallbackContract = await fallbackFactory.deploy();
    await fallbackContract.deployed();
    return { fallbackContract };
  }

  it("should emit a Log event with the function name 'fallback' and remaining gas when the fallback function is called", async function () {
    const { fallbackContract } = await loadFixture(deployFallbackFixture);
    const tx = await fallbackContract.sendTransaction({
      value: ethers.utils.parseEther("1"),
    });
    const receipt = await tx.wait();
    const event = receipt.events[0];
    expect(event.event).to.equal("Log");
    expect(event.args.func).to.equal("fallback");
    expect(event.args.gas).to.be.below(receipt.gasUsed);
  });

  it("should emit a Log event with the function name 'receive' and remaining gas when the receive function is called", async function () {
    const { fallbackContract } = await loadFixture(deployFallbackFixture);
    const tx = await fallbackContract.sendTransaction({
      value: ethers.utils.parseEther("1"),
    });
    const receipt = await tx.wait();
    const event = receipt.events[0];
    expect(event.event).to.equal("Log");
    expect(event.args.func).to.equal("receive");
    expect(event.args.gas).to.be.below(receipt.gasUsed);
  });

  it("should return the correct balance when the getBalance function is called", async function () {
    const { fallbackContract } = await loadFixture(deployFallbackFixture);
    const balanceBefore = await fallbackContract.getBalance();
    await fallbackContract.sendTransaction({
      value: ethers.utils.parseEther("1"),
    });
    const balanceAfter = await fallbackContract.getbackContract.getBalance();
    expect(balanceAfter).to.be.above(balanceBefore);
  });
});

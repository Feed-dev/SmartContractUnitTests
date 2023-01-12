const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Payable Contract", function () {
  let payable;
  let owner;

  async function deployPayableFixture() {
    const payableFactory = await ethers.getContractFactory("Payable");
    payable = await payableFactory.deploy();
    await payable.deployed();
    owner = await payable.owner();
    return { payable };
  }

  it("should have the correct owner address", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    expect(await payable.owner()).to.equal(owner);
  });
  it("should deposit ether correctly", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    const initialBalance = await ethers.provider.getBalance(payable.address);
    await payable.deposit({ value: ethers.utils.parseEther("1") });
    const finalBalance = await ethers.provider.getBalance(payable.address);
    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should throw an error when calling notPayable function with ether", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    await expect(payable.notPayable({ value: ethers.utils.parseEther("1") })).to
      .be.rejected;
  });
  it("should withdraw ether correctly", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    await payable.deposit({ value: ethers.utils.parseEther("1") });
    const initialBalance = await ethers.provider.getBalance(owner);
    await payable.withdraw();
    const finalBalance = await ethers.provider.getBalance(owner);
    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should transfer ether correctly", async function () {
    const { payable } = await loadFixture(deployPayableFixture);
    const recipient = ethers.Wallet.createRandom().address;
    await payable.deposit({ value: ethers.utils.parseEther("1") });
    const initialBalance = await ethers.provider.getBalance(recipient);
    await payable.transfer(recipient, ethers.utils.parseEther("1"));
    const finalBalance = await ethers.provider.getBalance(recipient);
    expect(finalBalance).to.be.above(initialBalance);
  });
});

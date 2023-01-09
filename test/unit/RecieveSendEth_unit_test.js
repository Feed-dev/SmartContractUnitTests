const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SendEther Contract", function () {
  async function deploySendEtherFixture() {
    const sendEtherFactory = await ethers.getContractFactory("SendEther");
    const [sender, recipient] = await ethers.getSigners();
    const sendEther = await sendEtherFactory.deploy();
    await sendEther.deployed();
    return { sendEtherFactory, sendEther, sender, recipient };
  }

  it("should send Ether via transfer()", async function () {
    const { sendEther, recipient } = await loadFixture(deploySendEtherFixture);
    const initialBalance = await recipient.getBalance();
    await sendEther.sendViaTransfer(recipient.address);
    const finalBalance = await recipient.getBalance();
    expect(finalBalance.sub(initialBalance)).to.equal(1000000000000000000);
  });

  it("should send Ether via send()", async function () {
    const { sendEther, recipient } = await loadFixture(deploySendEtherFixture);
    const initialBalance = await recipient.getBalance();
    await sendEther.sendViaSend(recipient.address);
    const finalBalance = await recipient.getBalance();
    expect(finalBalance.sub(initialBalance)).to.equal(1000000000000000000);
  });

  // it("should send Ether via call()", async function () {
  //   const { sendEther, recipient } = await loadFixture(deploySendEtherFixture);
  //   const initialBalance = await recipient.getBalance();
  //   await sendEther.sendViaCall(recipient.address);
  //   const finalBalance = await recipient.getBalance();
  //   expect(finalBalance.sub(initialBalance)).to.equal(1000000000000000000);
  // });
});

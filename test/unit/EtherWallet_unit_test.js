const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherWallet Contract Unit Tests", function () {
  async function deployEtherWalletFixture() {
    const etherWalletFactory = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await etherWalletFactory.deploy();
    await etherWallet.deployed();
    return { etherWallet };
  }
  it("should set the msg.sender as the owner of the contract", async function () {
    const { etherWallet } = await loadFixture(deployEtherWalletFixture);
    const expectedOwner = ethers.wallet.address;
    expect(await etherWallet.owner()).to.equal(expectedOwner);
  });

  it("should allow the owner to deposit funds", async function () {
    const { etherWallet } = await loadFixture(deployEtherWalletFixture);
    const initialBalance = await ethers.getBalance(etherWallet.address);
    const depositAmount = ethers.utils.parseEther("1.0");
    await etherWallet.sendTransaction({ value: depositAmount });
    const finalBalance = await ethers.getBalance(etherWallet.address);
    expect(finalBalance.sub(initialBalance)).to.equal(depositAmount);
  });

  it("should allow the owner to withdraw funds", async function () {
    const { etherWallet } = await loadFixture(deployEtherWalletFixture);
    await etherWallet.sendTransaction({
      value: ethers.utils.parseEther("1.0"),
    });
    const initialBalance = await ethers.getBalance(ethers.wallet.address);
    const amountToWithdraw = ethers.utils.parseEther("0.5");
    await etherWallet.withdraw(amountToWithdraw);
    const finalBalance = await ethers.getBalance(ethers.wallet.address);
    expect(finalBalance.sub(initialBalance)).to.equal(amountToWithdraw);
  });
  it("should not allow non-owners to withdraw funds", async function () {
    const { etherWallet } = await loadFixture(deployEtherWalletFixture);
    await etherWallet.sendTransaction({
      value: ethers.utils.parseEther("1.0"),
    });
    const randomWallet = ethers.Wallet.createRandom();
    await expect(
      etherWallet.connect(randomWallet).withdraw(ethers.utils.parseEther("0.5"))
    ).to.be.rejectedWith("caller is not owner");
  });
  it("should return the correct balance", async function () {
    const { etherWallet } = await loadFixture(deployEtherWalletFixture);
    await etherWallet.sendTransaction({ value: ethers.utilsdepositAmount });
    const finalBalance = await ethers.getBalance(etherWallet.address);
    expect(finalBalance.sub(initialBalance)).to.equal(depositAmount);
  });
});

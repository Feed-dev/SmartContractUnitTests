const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReceiveEther Contract", function () {
  let receiveEther, signer;

  beforeEach(async function () {
    // Load a fixture that deploys an instance of the ReceiveEther contract
    const fixture = await loadFixture(async () => {
      const receiveEtherFactory = await ethers.getContractFactory(
        "ReceiveEther"
      );
      receiveEther = await receiveEtherFactory.deploy();
      await receiveEther.deployed();
    });
    // Get the signer to send Ether to the contract
    signer = fixture.signers[0];
  });

  it("should receive Ether through the receive function", async function () {
    // Send 1 Ether to the contract through the receive function
    await receiveEther.receive({ value: ethers.utils.parseEther("1") });
    // Assert that the contract's balance is 1 Ether
    expect(await receiveEther.getBalance()).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("should receive Ether through the fallback function", async function () {
    // Send 1 Ether to the contract through the fallback function
    await signer.sendTransaction({
      to: receiveEther.address,
      value: ethers.utils.parseEther("1"),
    });
    // Assert that the contract's balance is 1 Ether
    expect(await receiveEther.getBalance()).to.equal(
      ethers.utils.parseEther("1")
    );
  });
});

const { expect } = require("chai");

describe("EtherWallet Contract Unit Tests", function () {
  let etherWallet;

  beforeEach(async function () {
    etherWallet = await EtherWallet.new();
  });

  it("should return the correct balance of the wallet", async function () {
    const balance = await etherWallet.getBalance();
    expect(balance.toString()).to.equal("0");
  });

  it("should allow the owner to withdraw funds", async function () {
    const owner = await etherWallet.owner();
    await etherWallet.sendTransaction({
      from: owner,
      value: web3.toWei(1, "ether"),
    });
    const balance = await web3.eth.getBalance(etherWallet.address);
    expect(balance.toString()).to.equal(web3.toWei(1, "ether"));

    const initialOwnerBalance = await web3.eth.getBalance(owner);
    await etherWallet.withdraw(web3.toWei(0.5, "ether"), { from: owner });
    const finalOwnerBalance = await web3.eth.getBalance(owner);
    expect(finalOwnerBalance.toString()).to.equal(
      initialOwnerBalance.add(web3.toWei(0.5, "ether")).toString()
    );
  });

  it("should not allow non-owner to withdraw funds", async function () {
    const owner = await etherWallet.owner();
    const nonOwner = (await web3.eth.accounts)[1];
    await etherWallet.sendTransaction({
      from: owner,
      value: web3.toWei(1, "ether"),
    });
    const balance = await web3.eth.getBalance(etherWallet.address);
    expect(balance.toString()).to.equal(web3.toWei(1, "ether"));

    try {
      await etherWallet.withdraw(web3.toWei(0.5, "ether"), { from: nonOwner });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("caller is not owner");
    }
  });
});

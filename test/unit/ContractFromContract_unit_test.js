const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Car and CarFactory Contract", function () {
  let carFactory;
  let owner;
  let carAddress;
  let recipient;
  let salt;

  async function deployCarFixture() {
    const carFactoryFactory = await ethers.getContractFactory("CarFactory");
    carFactory = await carFactoryFactory.deploy();
    await carFactory.deployed();
    owner = await ethers.getSigner();
    recipient = ethers.Wallet.createRandom().address;
    salt = ethers.utils.solidityKeccak256(["bytes32"], ["random"]);
    return { carFactory };
  }

  it("should create a new car", async function () {
    const { carFactory } = await loadFixture(deployCarFixture);
    await carFactory.create(owner.address, "Tesla Model S");
    const car = await carFactory.cars(0);
    expect(car.owner).to.equal(owner.address);
    expect(car.model).to.equal("Tesla Model S");
  });

  it("should create a new car and deposit ether to the car contract", async function () {
    const { carFactory } = await loadFixture(deployCarFixture);
    await carFactory.createAndSendEther(owner.address, "Tesla Model S", {
      value: ethers.utils.parseEther("1"),
    });
    const car = await carFactory.cars(0);
    carAddress = car.carAddr;
    const balance = await ethers.provider.getBalance(carAddress);
    expect(balance).to.be.above(0);
  });

  it("should not allow to call non-payable function with ether", async function () {
    const { carFactory } = await loadFixture(deployCarFixture);
    await expect(
      carFactory.create(owner.address, "Tesla Model S", {
        value: ethers.utils.parseEther("1"),
      })
    ).to.be.rejected;
  });

  it("should transfer ether from the car contract to another address", async function () {
    const { carFactory } = await loadFixture(deployCarFixture);
    const initialBalance = await ethers.provider.getBalance(recipient);
    await carFactory.transfer(
      carAddress,
      recipient,
      ethers.utils.parseEther("1")
    );
    const finalBalance = await ethers.provider.getBalance(recipient);
    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should return the correct salt value", async function () {
    const { car } = await loadFixture(deployCarFixture);
    const returnedSalt = await car.salt();
    expect(returnedSalt).to.equal(salt);
  });
});

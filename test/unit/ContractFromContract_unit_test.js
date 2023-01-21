const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Car and CarFactory Contract", function () {
  let car, carFactory, owner, model, carAddr, salt;

  async function deployCarFixture() {
    const carFactory = await ethers.getContractFactory("CarFactory");
    carFactory = await carFactory.deploy();
    await carFactory.deployed();
    owner = ethers.Wallet.createRandom().address;
    model = "Tesla Model S";
    salt = ethers.utils.formatBytes32String("uniqueSalt");
    await carFactory.create2AndSendEther(owner, model, salt, {
      value: ethers.utils.parseEther("1"),
    });
    carAddr = await carFactory.getCar(0);
    car = await new ethers.Contract(carAddr, Car.abi, ethers.provider);
    return { car, carFactory };
  }

  it("should create a new car and deposit ether to the car contract", async function () {
    const { car, carFactory } = await loadFixture(deployCarFixture);
    const carInfo = await carFactory.getCar(0);
    expect(carInfo.owner).to.equal(owner);
    expect(carInfo.model).to.equal(model);
    expect(carInfo.carAddr).to.equal(carAddr);
    expect(carInfo.balance).to.equal(ethers.utils.parseEther("1"));
  });

  it("should not allow to call non-payable function with ether", async function () {
    const { car } = await loadFixture(deployCarFixture);
    await expect(car.nonPayable({ value: ethers.utils.parseEther("1") })).to.be
      .rejected;
  });

  it("should transfer ether from the car contract to another address", async function () {
    const { car } = await loadFixture(deployCarFixture);
    const recipient = ethers.Wallet.createRandom().address;
    const initialBalance = await ethers.provider.getBalance(recipient);
    await car.transfer(recipient, ethers.utils.parseEther("1"));
    const finalBalance = await ethers.provider.getBalance(recipient);
    expect(finalBalance).to.be.above(initialBalance);
  });

  it("should return the correct salt value", async function () {
    const { car } = await loadFixture(deployCarFixture);
    const returnedSalt = await car.salt();
    expect(returnedSalt).to.equal(salt);
  });
});

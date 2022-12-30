const { expect, assert } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("A Unit Tests", function () {
  async function deployAFixture() {
    const AFactory = await ethers.getContractFactory("A");
    const A = await AFactory.deploy();
    await A.deployed();
    return { AFactory, A };
  }

  it("should return the correct string when calling foo()", async function () {
    const { A } = await loadFixture(deployAFixture);
    const result = await A.foo();
    expect(result).to.equal("A");
  });
});

describe("B Unit Tests", function () {
  async function deployBFixture() {
    const BFactory = await ethers.getContractFactory("B");
    const B = await BFactory.deploy();
    await B.deployed();
    return { BFactory, B };
  }

  it("should return the correct string when calling foo()", async function () {
    const { B } = await loadFixture(deployBFixture);
    const result = await B.foo();
    expect(result).to.equal("B");
  });
});

describe("C Unit Tests", function () {
  async function deployCFixture() {
    const CFactory = await ethers.getContractFactory("C");
    const C = await CFactory.deploy();
    await C.deployed();
    return { CFactory, C };
  }

  it("should return the correct string when calling foo()", async function () {
    const { C } = await loadFixture(deployCFixture);
    const result = await C.foo();
    expect(result).to.equal("C");
  });
});

describe("D Unit Tests", function () {
  async function deployDFixture() {
    const DFactory = await ethers.getContractFactory("D");
    const D = await DFactory.deploy();
    await D.deployed();
    return { DFactory, D };
  }

  it("should return the correct string when calling foo()", async function () {
    const { D } = await loadFixture(deployDFixture);
    const result = await D.foo();
    expect(result).to.equal("C");
  });
});

describe("E Unit Tests", function () {
  async function deployEFixture() {
    const EFactory = await ethers.getContractFactory("E");
    const E = await EFactory.deploy();
    await E.deployed();
    return { EFactory, E };
  }

  it("should return the correct string when calling foo()", async function () {
    const { E } = await loadFixture(deployEFixture);
    const result = await E.foo();
    expect(result).to.equal("B");
  });
});

describe("F Unit Tests", function () {
  async function deployFFixture() {
    const FFactory = await ethers.getContractFactory("F");
    const F = await FFactory.deploy();
    await F.deployed();
    return { FFactory, F };
  }

  it("should return the correct string when calling foo()", async function () {
    const { F } = await loadFixture(deployFFixture);
    const result = await F.foo();
    expect(result).to.equal("B");
  });
});

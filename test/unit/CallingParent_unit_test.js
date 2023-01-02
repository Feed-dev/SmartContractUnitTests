const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("A Unit Tests", function () {
  async function deployAFixture() {
    const AFactory = await ethers.getContractFactory("A");
    const A = await AFactory.deploy();
    await A.deployed();
    return { AFactory, A };
  }

  it("should log 'A.foo called' when calling foo()", async function () {
    const { A } = await loadFixture(deployAFixture);
    const result = await A.foo();
    expect(result.logs[0].args.message).to.equal("A.foo called");
  });

  it("should log 'A.bar called' when calling bar()", async function () {
    const { A } = await loadFixture(deployAFixture);
    const result = await A.bar();
    expect(result.logs[0].args.message).to.equal("A.bar called");
  });
});

describe("B Unit Tests", function () {
  async function deployBFixture() {
    const BFactory = await ethers.getContractFactory("B");
    const B = await BFactory.deploy();
    await B.deployed();
    return { BFactory, B };
  }

  it("should log 'B.foo called' and 'A.foo called' when calling foo()", async function () {
    const { B } = await loadFixture(deployBFixture);
    const result = await B.foo();
    expect(result.logs[0].args.message).to.equal("B.foo called");
    expect(result.logs[1].args.message).to.equal("A.foo called");
  });

  it("should log 'B.bar called' and 'A.bar called' when calling bar()", async function () {
    const { B } = await loadFixture(deployBFixture);
    const result = await B.bar();
    expect(result.logs[0].args.message).to.equal("B.bar called");
  });
});

describe("C Unit Tests", function () {
  async function deployCFixture() {
    const CFactory = await ethers.getContractFactory("C");
    const C = await CFactory.deploy();
    await C.deployed();
    return { CFactory, C };
  }

  it("should log 'C.foo called' and 'A.foo called' when calling foo()", async function () {
    const { C } = await loadFixture(deployCFixture);
    const result = await C.foo();
    expect(result.logs[0].args.message).to.equal("C.foo called");
    expect(result.logs[1].args.message).to.equal("A.foo called");
  });

  it("should log 'C.bar called' and 'A.bar called' when calling bar()", async function () {
    const { C } = await loadFixture(deployCFixture);
    const result = await C.bar();
    expect(result.logs[0].args.message).to.equal("C.bar called");
    expect(result.logs[1].args.message).to.equal("A.bar called");
  });
});

describe("D Unit Tests", function () {
  async function deployDFixture() {
    const DFactory = await ethers.getContractFactory("D");
    const D = await DFactory.deploy();
    await D.deployed();
    return { DFactory, D };
  }

  it("should log 'C.foo called' and 'A.foo called' when calling foo()", async function () {
    const { D } = await loadFixture(deployDFixture);
    const result = await D.foo();
    expect(result.logs[0].args.message).to.equal("C.foo called");
    expect(result.logs[1].args.message).to.equal("A.foo called");
  });

  it("should log 'C.bar called', 'B.bar called', and 'A.bar called' when calling bar()", async function () {
    const { D } = await loadFixture(deployDFixture);
    const result = await D.bar();
    expect(result.logs[0].args.message).to.equal("C.bar called");
    expect(result.logs[1].args.message).to.equal("B.bar called");
    expect(result.logs[2].args.message).to.equal("A.bar called");
  });
});

describe("B contract", function () {
  async function deployBFixture() {
    const BFactory = await ethers.getContractFactory("B");
    const B = await BFactory.deploy();
    await B.deployed();
    return { BFactory, B };
  }

  it("should log 'B.foo called' and 'A.foo called' when calling foo()", async function () {
    const { B } = await loadFixture(deployBFixture);
    const result = await B.foo();
    expect(result.logs[0].args.message).to.equal("B.foo called");
    expect(result.logs[1].args.message).to.equal("A.foo called");
  });

  it("should log 'B.bar called' and 'A.bar called' when calling bar()", async function () {
    const { B } = await loadFixture(deployBFixture);
    const result = await B.bar();
    expect(result.logs[0].args.message).to.equal("B.bar called");
    expect(result.logs[1].args.message).to.equal("A.bar called");
  });
});

describe("C contract", function () {
  async function deployCFixture() {
    const CFactory = await ethers.getContractFactory("C");
    const C = await CFactory.deploy();
    await C.deployed();
    return { CFactory, C };
  }

  it("should log 'C.foo called' and 'A.foo called' when calling foo()", async function () {
    const { C } = await loadFixture(deployCFixture);
    const result = await C.foo();
    expect(result.logs[0].args.message).to.equal("C.foo called");
    expect(result.logs[1].args.message).to.equal("A.foo called");
  });

  it("should log 'C.bar called' and 'A.bar called' when calling bar()", async function () {
    const { C } = await loadFixture(deployCFixture);
    const result = await C.bar();
    expect(result.logs[0].args.message).to.equal("C.bar called");
    expect(result.logs[1].args.message).to.equal("A.bar called");
  });
});

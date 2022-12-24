const { expect, assert } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Todos Unit Tests", function () {
  async function deployTodosFixture() {
    const todosFactory = await ethers.getContractFactory("Todos");
    const todos = await todosFactory.deploy();
    await todos.deployed();
    return { todosFactory, todos };
  }

  it("should create a new to-do item with the correct text and completed status", async function () {
    const { todos } = await loadFixture(deployTodosFixture);
    await todos.create("Buy milk");
    const todo = await todos.get(0);
    expect(todo.text).to.equal("Buy milk");
    expect(todo.completed).to.be.false;
  });

  it("should update the text of an existing to-do item", async function () {
    const { todos } = await loadFixture(deployTodosFixture);
    await todos.create("Buy milk");
    await todos.updateText(0, "Buy almond milk");
    const todo = await todos.get(0);
    expect(todo.text).to.equal("Buy almond milk");
  });

  it("should toggle the completed status of an existing to-do item", async function () {
    const { todos } = await loadFixture(deployTodosFixture);
    await todos.create("Buy milk");
    await todos.toggleCompleted(0);
    const todo = await todos.get(0);
    expect(todo.completed).to.be.true;
    await todos.toggleCompleted(0);
    const todo2 = await todos.get(0);
    expect(todo2.completed).to.be.false;
  });
});

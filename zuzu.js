const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    console.log("new block is created");
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + this.data + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date(), "GENESIS BLOCK", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
let zuzu = new Blockchain();
zuzu.addBlock(new Block(1, "2", { account: "3" }));
zuzu.addBlock(new Block(2, "3", { account: "4" }));

console.log(JSON.stringify(zuzu, null, 3));

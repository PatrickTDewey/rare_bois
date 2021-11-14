const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index+ this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Geneis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    showChain(){
        this.chain.forEach(block => console.log(block));
    }
    isChainValid(){
        for (let index = 0; index < this.chain.length - 1; index++) {
            if (this.chain[index]['hash'] !== this.chain[index].calculateHash()) {
                return false;
            }
            if (this.chain[index].hash != this.chain[index+1].previousHash) {
                return false;
            }
            
        }
        return true;
    }
}

let rareCoin = new Blockchain();
rareCoin.addBlock(new Block(1, "11/11/2021", {amount: 4}))
rareCoin.addBlock(new Block(2, "11/11/2021", {amount: 10}))
// rareCoin.showChain();
// console.log(rareCoin.isChainValid());
rareCoin.chain[1]['data'] = {amount: 400 };
rareCoin.chain[1]['hash'] = rareCoin.chain[1].calculateHash();
rareCoin.chain[2]['previousHash'] = rareCoin.chain[1]['hash'];
console.log(rareCoin.isChainValid());
rareCoin.showChain();
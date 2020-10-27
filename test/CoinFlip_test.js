const CoinFlip = artifacts.require("CoinFlip");
const truffleAssert = require("truffle-assertions")

contract("CoinFlip", async function(){
    it("shouldn't allow an non owner to deposite", async function(){
        let instance = await CoinFlip.deployed();
        await truffleAssert.fails(instance.fundContract({value: web3.utils.toWei("1", "ether")}));
    })
})
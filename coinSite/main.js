var web3 = new Web3(web3.givenProvider);
var contractInstance;

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0x4760748FD9F0bd81d2Ed6e4E64dab24Bc2545981" , {from: accounts[1]});
        console.log(contractInstance);
    });
    $("#deposite_button").click(deposite)
});
    function deposite(){
        var amount = $("#deposite_input").val();
        var config = {
            value: web3.utils.toWei(amount, "ether")
        }

        alert("You have deposited " + amount + " Ether!");

        contractInstance.methods.fundContract().send(config)
    }

    function flip(){
        var bet = $("#bet_input").val()
        var config = {
            value: web3.utils.toWei(bet, "ether")
        }

        contractInstance.methods.placeBet(bet).send(config)
        .on("transactionHash", function(hash){
            console.log(hash);
        })
        .on("confirmation", function(confirmationsNr, receipt){
            console.log(confirmationNr);
        })
        .on("receipt", function(receipt){
            console.log(receipt);
            if(receipt.events.betResult.returnsValues[2] === false){
                alert("You lost " + bet + " Ether!");
            }
            else if(receipt.events.betResult.returnValues[2] === true){
                alert("You won " + bet + " Ether!");
            }
        })
    }
    

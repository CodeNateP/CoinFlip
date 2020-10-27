pragma solidity 0.5.12;

import "./Ownable.sol";

contract CoinFlip is Ownable{

    uint public balance;

    event betResult(address gambler, uint betAmount, bool result); 
    event funded(address owner, uint funding);

    modifier costs(uint cost){
        require(msg.value >= cost);
        _;
    }

    function placeBet(uint betAmount) public payable costs(0.01 ether)returns(bool){
            require(address(this).balance >= msg.value, "The contract doesnt have a high enouhg balance");
            bool result;

            if (now %2 == 1){
                balance += msg.value;
                result = false;

            }
            else if(now %2 == 0){
                balance -= msg.value;
                msg.sender.transfer(msg.value * 2);
                result = true;
            }
            emit betResult(msg.sender, betAmount, result );
            return result;
    }

    function withdrawlAll() public onlyOwner returns(uint) {
        uint toTransfer = balance;
        balance = 0;
        msg.sender.transfer(toTransfer);
        return toTransfer;
    }

    function getBalance() public view onlyOwner returns(uint){
        return balance;
    }

    function fundContract() public payable onlyOwner costs(5 ether) returns(uint){
        balance += msg.value;
        emit funded(msg.sender, msg.value);
        return msg.value;
    }



}

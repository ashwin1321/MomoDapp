//SPDX-License-Identifier: Unlicensed

pragma solidity >=0.5.0;

contract Momo{

    struct Memo{       // not momo

        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor(){
        owner = payable( msg.sender);
    }

    function buyMomo(string memory name, string memory message) public payable{
        require(msg.value>0, "Please pay amount greater than 0....");

        owner.transfer(msg.value);                          // owner ko ma transfer hunxa 
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }
    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}
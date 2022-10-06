// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Fundraiser {
    uint256 Balance = 0;
    uint256 PriceNeeded;
    address owner;

    string FundraiserName;
    event NewFundraiser(string _name, uint256 _amount);
    event Deposit(uint256 _depositAmount);
    event Increase(uint256 newNumber);

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not The Owner");
        _;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function BalanceOf() external view returns (uint256) {
        return Balance;
    }

    function getPriceNeeded() external view returns (uint256) {
        return PriceNeeded;
    }

    function getFundraiserName() external view returns (string memory) {
        return FundraiserName;
    }

    function GimmeTheMoney() public payable {
        Balance += msg.value;
        emit Deposit(msg.value);
    }

    function StartFundraiser(string memory name, uint256 increaser) public {
        emit NewFundraiser(name, increaser);
        PriceNeeded = increaser;
        FundraiserName = name;
        owner = msg.sender;
    }

    function IncreaseTheFundraiser(uint _increase) external onlyOwner {
        emit Increase(_increase);
        PriceNeeded = _increase;
    }

    function TransferMoney(address payable _to) external onlyOwner {
        require(
            Balance >= PriceNeeded,
            "Fundraiser did not Reach the needed Price"
        );

        _to.transfer(PriceNeeded);

        Balance = Balance - PriceNeeded;
        StartFundraiser("", 0);
    }

    receive() external payable {}
}

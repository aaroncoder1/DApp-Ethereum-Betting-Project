// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPredictionMarket {
    struct Market {
        string question;
        string cryptoSymbol;
        uint256 deadline;
        address creator;
        bool resolved;
        mapping(address => uint256) bets;
    }

    mapping(uint256 => Market) public markets;
    mapping(address => uint256) public balances; // Mapping to store user balances
    uint256 public marketCount;

    // Function to create a new market
    function createMarket(string memory question, string memory cryptoSymbol, uint256 deadline) public {
        marketCount++;
        Market storage newMarket = markets[marketCount];
        newMarket.question = question;
        newMarket.cryptoSymbol = cryptoSymbol;
        newMarket.deadline = deadline;
        newMarket.creator = msg.sender;
        newMarket.resolved = false;
    }

    // Function to add points to a user's balance
    function addPoints(uint256 amount) public {
        balances[msg.sender] += amount;
    }

    // Function to place a bet on a market
    function placeBet(uint256 marketId, uint256 amount) public {
        require(!markets[marketId].resolved, "Market already resolved");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        markets[marketId].bets[msg.sender] += amount;
    }

    // Function to resolve a market
    function resolveMarket(uint256 marketId, bool outcome) public {
        require(markets[marketId].creator == msg.sender, "Only creator can resolve");
        require(!markets[marketId].resolved, "Market already resolved");

        markets[marketId].resolved = true;

        // could implement logic to distribute rewards based on the outcome
        // Example: If outcome is true, distribute points to the bettors who bet on true
        
    }
}
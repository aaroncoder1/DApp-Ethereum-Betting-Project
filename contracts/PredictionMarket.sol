// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CryptoPredictionMarket {
    struct Market {
        string question;
        string cryptoSymbol;
        uint256 deadline;
        address creator;
        bool resolved;
        uint256 betAmount;
        bool outcome; // True if the condition is met, false otherwise
        mapping(address => uint256) bets;
        AggregatorV3Interface priceFeed; // Reference to the price feed
    }

    mapping(uint256 => Market) public markets;
    uint256 public marketCount;

    mapping(string => address) public priceFeeds; // Mapping from crypto symbols to Chainlink price feeds

    // Event emitted when a market is created
    event MarketCreated(
        uint256 marketId,
        string question,
        string cryptoSymbol,
        uint256 deadline,
        address creator,
        uint256 betAmount
    );

    constructor() {
        // Initialize the price feed mappings
        priceFeeds["BTC"] = 0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c; // BTC/USD price feed address
        priceFeeds["ETH"] = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419; // ETH/USD price feed address
    }

    function createMarket(string memory question, string memory cryptoSymbol, uint256 deadline) public payable {
        require(priceFeeds[cryptoSymbol] != address(0), "Unsupported cryptocurrency");

        marketCount++;
        Market storage newMarket = markets[marketCount];
        newMarket.question = question;
        newMarket.cryptoSymbol = cryptoSymbol;
        newMarket.deadline = deadline;
        newMarket.creator = msg.sender;
        newMarket.betAmount = msg.value;
        newMarket.resolved = false;
        newMarket.priceFeed = AggregatorV3Interface(priceFeeds[cryptoSymbol]);

        emit MarketCreated(marketCount, question, cryptoSymbol, deadline, msg.sender, msg.value);
    }

    function resolveMarket(uint256 marketId, uint256 targetPrice) public {
        Market storage market = markets[marketId];
        require(block.timestamp >= market.deadline, "Market resolution time has not been reached");
        require(!market.resolved, "Market already resolved");

        // Fetch price data from the Chainlink oracle
        (,int price,,,) = market.priceFeed.latestRoundData();
        uint256 currentPrice = uint256(price);

        if (currentPrice >= targetPrice * 10 ** 8) { // Adjusting for decimals
            market.outcome = true;
            payable(market.creator).transfer(market.betAmount * 2); // Winner takes all
        } else {
            market.outcome = false;
        }

        market.resolved = true;
    }
}

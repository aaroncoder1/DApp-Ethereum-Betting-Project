import React, { useEffect, useState } from 'react';
import { contract, web3 } from '../web3';

const DisplayMarkets = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        // Fetch past events from the contract
        const events = await contract.getPastEvents('MarketCreated', {
          fromBlock: 0,
          toBlock: 'latest',
        });

        // Map the event data to market objects
        const marketsData = events.map(event => ({
          marketId: event.returnValues.marketId,
          question: event.returnValues.question,
          cryptoSymbol: event.returnValues.cryptoSymbol,
          deadline: event.returnValues.deadline,
        }));

        // Update state with the fetched markets
        setMarkets(marketsData);
      } catch (error) {
        console.error("Error fetching markets: ", error);
      }
    };

    fetchMarkets();
  }, []);

  return (
    <div>
      <h2>Available Markets</h2>
      {markets.length > 0 ? (
        markets.map((market, index) => (
          <div key={index}>
            <p>Market ID: {market.marketId}</p>
            <p>Question: {market.question}</p>
            <p>Crypto Symbol: {market.cryptoSymbol}</p>
            <p>Deadline: {new Date(market.deadline * 1000).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No markets available</p>
      )}
    </div>
  );
};

export default DisplayMarkets;

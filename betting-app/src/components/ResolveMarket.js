import React, { useState } from 'react';
import { contract, web3 } from '../web3';

const ResolveMarket = () => {
  const [marketId, setMarketId] = useState('');
  const [outcome, setOutcome] = useState(false);

  const resolveMarket = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      await contract.methods.resolveMarket(marketId, outcome).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei('20', 'gwei'), // Specify gasPrice to avoid EIP-1559 errors
        gas: 3000000, // Set a gas limit
      });

      alert('Market resolved successfully!');

    } catch (error) {
      console.error('An error occurred while resolving the market:', error);
      alert('Failed to resolve the market. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Resolve Market</h2>
      <input 
        type="text" 
        placeholder="Market ID" 
        value={marketId} 
        onChange={e => setMarketId(e.target.value)} 
      />
      <label>
        <input 
          type="checkbox" 
          checked={outcome} 
          onChange={() => setOutcome(!outcome)} 
        />
        Outcome (True/False)
      </label>
      <button onClick={resolveMarket}>Resolve Market</button>
    </div>
  );
};

export default ResolveMarket;

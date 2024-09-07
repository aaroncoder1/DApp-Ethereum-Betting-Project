import React, { useState } from 'react';
import { contract, web3 } from '../web3';

const ResolveMarket = () => {
  const [marketId, setMarketId] = useState('');
  const [targetPrice, setTargetPrice] = useState(''); // Add target price input

  const resolveMarket = async () => {
    try {
      const accounts = await web3.eth.getAccounts();

      // Call the smart contract's resolveMarket function
      await contract.methods.resolveMarket(marketId, targetPrice).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei('20', 'gwei'),
        gas: 3000000,
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
      <input 
        type="text" 
        placeholder="Target Price" 
        value={targetPrice} 
        onChange={e => setTargetPrice(e.target.value)} 
      />
      <button onClick={resolveMarket}>Resolve Market</button>
    </div>
  );
};

export default ResolveMarket;

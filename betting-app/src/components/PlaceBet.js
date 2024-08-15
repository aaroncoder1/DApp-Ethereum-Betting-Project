import React, { useState } from 'react';
import { contract, web3 } from '../web3';

const PlaceBet = () => {
  const [marketId, setMarketId] = useState('');
  const [amount, setAmount] = useState('');

  const placeBet = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      
      await contract.methods.placeBet(marketId, amount).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei('20', 'gwei'), // Specify gasPrice to avoid EIP-1559 errors
        gas: 3000000, // Set a gas limit
      });

      alert('Bet placed successfully!');

    } catch (error) {
      console.error('An error occurred while placing the bet:', error);
      alert('Failed to place the bet. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Place a Bet</h2>
      <input 
        type="text" 
        placeholder="Market ID" 
        value={marketId} 
        onChange={e => setMarketId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Amount" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
      />
      <button onClick={placeBet}>Place Bet</button>
    </div>
  );
};

export default PlaceBet;

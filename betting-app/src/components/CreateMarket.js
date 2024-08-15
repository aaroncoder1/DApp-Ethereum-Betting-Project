import React, { useState } from 'react';
import { contract, web3 } from '../web3';

const CreateMarket = () => {
  const [question, setQuestion] = useState('');
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [deadline, setDeadline] = useState('');

  const createMarket = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      
      await contract.methods.createMarket(question, cryptoSymbol, deadline).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei('20', 'gwei'), // Specify gasPrice to avoid EIP-1559 errors
        gas: 3000000, // Set a gas limit
      });

      alert('Market created successfully!');

    } catch (error) {
      console.error('An error occurred while creating the market:', error);
      alert('Failed to create the market. Please check the console for more details.');
    }
  };

  return (
    <div>
      <h2>Create a New Market</h2>
      <input 
        type="text" 
        placeholder="Question" 
        value={question} 
        onChange={e => setQuestion(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Crypto Symbol" 
        value={cryptoSymbol} 
        onChange={e => setCryptoSymbol(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Deadline (timestamp)" 
        value={deadline} 
        onChange={e => setDeadline(e.target.value)} 
      />
      <button onClick={createMarket}>Create Market</button>
    </div>
  );
};

export default CreateMarket;

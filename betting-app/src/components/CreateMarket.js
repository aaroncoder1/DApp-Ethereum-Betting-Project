import React, { useState } from 'react';
import { web3, contractABI, contractAddress } from '../web3'; // import these correctly

const CreateMarket = ({ account }) => {
  const [question, setQuestion] = useState('');
  const [cryptoSymbol, setCryptoSymbol] = useState('BTC'); // Default to BTC
  const [deadline, setDeadline] = useState('');
  const [betAmount, setBetAmount] = useState('');

  const createMarket = async () => {
    try {
      console.log("Attempting to create market...");
      
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log("Contract instantiated:", contract);
      
      const accounts = await web3.eth.getAccounts();
      console.log("Fetched accounts:", accounts);
      
      const account = accounts[0];
      console.log("Using account:", account);
  
      const convertedDeadline = Math.floor(new Date(deadline).getTime() / 1000);
      console.log("Converted Deadline Timestamp:", convertedDeadline);
      
      const response = await contract.methods.createMarket(question, cryptoSymbol, convertedDeadline).send({
        from: account,
        value: web3.utils.toWei(betAmount, 'ether'),
        gas: 3000000, // Set a gas limit
        gasPrice: web3.utils.toWei('20', 'gwei'), // Specify gas price to avoid EIP-1559 errors
      });
      
      console.log("Transaction successful:", response);
      alert('Market created successfully!');
      
    } catch (error) {
      console.error("An error occurred while creating the market:", error);
      alert('Failed to create market. Please check the console for more details.');
    }
  };
  
  

  return (
    <div>
      <h2>Create a New Market</h2>
      <input type="text" placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
      <select value={cryptoSymbol} onChange={e => setCryptoSymbol(e.target.value)}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
      <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <input type="text" placeholder="Bet Amount (ETH)" value={betAmount} onChange={e => setBetAmount(e.target.value)} />
      <button onClick={createMarket}>Create Market</button>
    </div>
  );
};

export default CreateMarket;

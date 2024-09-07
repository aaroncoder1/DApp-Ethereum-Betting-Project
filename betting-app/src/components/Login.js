import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const Login = ({ onLogin }) => {
  const [account, setAccount] = useState(null);

  const handleConnectWallet = async () => {
    console.log("Connect Wallet button clicked");

    const provider = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      try {
        const accounts = await web3.eth.requestAccounts();

        console.log("User connected account:", accounts[0]);

        setAccount(accounts[0]);
        onLogin(accounts[0], web3);
      } catch (error) {
        console.error("User denied account access or there was an issue: ", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {account ? (
        <p>Connected as: {account}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Login;

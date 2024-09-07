import React, { useState } from 'react';
import './App.css';
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import ResolveMarket from './components/ResolveMarket';
import Login from './components/Login';
import DisplayMarkets from './components/DisplayMarkets';  // Import the DisplayMarkets component

function App() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const handleLogin = (account, web3) => {
    console.log("User logged in with account:", account);
    setAccount(account);
    setWeb3(web3);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setAccount(null);
    setWeb3(null);
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Prediction Market</h1>

        {!account ? (
          <Login onLogin={handleLogin} />
        ) : (
          <div>
            <p>Welcome, {account}</p>
            <button onClick={handleLogout}>Logout</button>
            <CreateMarket account={account} web3={web3} />
            <PlaceBet account={account} web3={web3} />
            <ResolveMarket account={account} web3={web3} />
            <DisplayMarkets />  {/* Add DisplayMarkets here */}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

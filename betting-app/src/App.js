import React from 'react';
import './App.css';

// Import your custom components
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import ResolveMarket from './components/ResolveMarket';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Prediction Market</h1>
        {/* Render the CreateMarket component */}
        <CreateMarket />

        {/* Render the PlaceBet component */}
        <PlaceBet />

        {/* Render the ResolveMarket component */}
        <ResolveMarket />
      </header>
    </div>
  );
}

export default App;

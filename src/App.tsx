import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/BoardStyles.css'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:7000', { transports: ['websocket'] });

socket.connect();

function App() {
  const [ message, setMessage ] = useState('');

  socket.on('EmitData', (payload) => {
    setMessage(payload);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Client 2</h1>
        <p className="App-title">Receiving Message</p>
        <p className="App-text">{message}</p>
      </header>
    </div>
  );
}

export default App;

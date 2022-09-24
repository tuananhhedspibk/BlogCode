import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [ message, setMessage ] = useState('');

  const submitFormHandler = async (e: any) => {
    e.preventDefault();

    await axios.post('http://localhost:6969/app/push-data', {
      message,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Client 1</h1>
        <form
          className="App-form"
        >
          <input
            className="App-form-input"
            type='text'
            placeholder='Text something Bobs !!'
            onChange={(e) => { setMessage(e.target.value); }}
            value={message}
          />
          <button
            className="App-form-button"
            onClick={submitFormHandler}
          >
            Send Message
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;

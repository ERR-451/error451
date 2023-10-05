import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="App">
      <header className="App-header">
        <Login />
      </header>
    </div>
    </div>
  );
}

export default App;
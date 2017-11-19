import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Auth from './auth';
import Main from './views/Main';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Auth>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Twasi</h1>
        </header>
        <Route path="/" exact component={Main} />
      </div>
    </Auth>
  </BrowserRouter>
);

export default App;

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

/**
 * @module index.js
 * @description Entry point for application; hangs React app off of #root div in index.html.
 **/

import React from 'react';
import Navbar from './pages/Navbar.jsx';

const App = () => {
  return (
    <Navbar />
  );
};

export default App;

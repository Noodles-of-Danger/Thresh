import React, { useState, createContext } from 'react';
import Home from './Home.jsx';
import { Login }  from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import Board from './Board.jsx';

export const UserContext = createContext('mr.default');   // ADDED

const Navbar = () => {
  const [selectedPage, setSelectedPage] = useState('');
  // const navigate = useNavigate();

  const [userId, setUserId] = useState('');    // ADDED
  return (
    <UserContext.Provider value={userId}>  
      <nav className="fixed w-screen bg-secondary-500 h-[80px] z-10 drop-shadow-xl">
        <div className="flex justify-between w-full h-full px-20">
          <div className="flex items-center gap-10">
            <Link to='/'>
            <img
              alt="logo"
              src={Logo}
              className="cursor-pointer"
              onClick={() => setSelectedPage('home')}
              />
              </Link>
            <Link
              to="/dashboard"
              onClick={() => setSelectedPage('dashboard')}
              className={`${
                selectedPage === 'dashboard'
                  ? 'text-tertiary-500'
                  : 'text-primary-500'
              } hover:text-opacity-75`}
            >
              Dashboard
            </Link>
            <select></select>
            {/* <Link
              to="/dashboard"
              onClick={() => setSelectedPage('dashboard')}
              className={`${
                selectedPage === 'dashboard'
                  ? 'text-tertiary-500'
                  : 'text-primary-500'
              } hover:text-opacity-75`}
            >
              Dashboard
            </Link> */}
          </div>
          <div className="flex items-center gap-10">
            <Link to="/login">
              <button className="bg-primary-500 text-secondary-500">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button>Become a Member</button>
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board" element={<Board />} />
        <Route path="/login" element={<Login setUserId={setUserId}/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
     </UserContext.Provider>
  );
};

export default Navbar;

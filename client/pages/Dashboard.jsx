import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {UserContext} from './Navbar.jsx';
import Board from './Board.jsx';

const Dashboard = () => {
  const userID = useContext(UserContext);

  const [boards, setBoards] = useState('');

  const getUserBoards = async (id) => {
    try {
      const response = await axios.get(`board/getBoards/${id}`);
      console.log(response.data);
    } catch (err) {
      err.message = ('Eror in getting user\'s boards');
      console.log('err:', err)
    }
  }

  if (userID) getUserBoards (userID);

  // axios fetch all boards 
  // response object resp.data[]?
  // map over response object => <link to={boardid} <board props>?
  return(
    <div className="w-screen h-screen grid items-center justify-center">
      <div>Board Creator Component goes here, takes name and manager ID (userID)</div>

    </div>
  )
};

export default Dashboard;
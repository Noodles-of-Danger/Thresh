import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./Navbar.jsx";
import Board from "./Board.jsx";
import DashBoardCard from "./DashBoardCard.jsx";

const Dashboard = () => {
  const userID = useContext(UserContext);

  const [boards, setBoards] = useState([]);

  // const bundledBoardCards = [];
  const getUserBoards = async (id) => {
    try {
      const response = await axios.get(`api/board/getBoards/${id}`);
      // console.log(response.data);
      setBoards(response.data);
    } catch (err) {
      err.message = "Error in getting user's boards";
      console.log("err:", err);
    }
  };
  if (userID) {
    useEffect(() => {
      getUserBoards(userID);
    }, []);
  }

  console.log(boards);

  return (
    <div className="w-screen h-screen grid items-center justify-center">
      <div>
        Board Creator Component goes here, takes name and manager ID (userID)
        {userID}
      </div>
      {/* Bundle up board cards here for presentation below using DashBoardCard component --- need to do CSS

      CONSTRUCT THIS from response.data <--- each array element is an object w. 3 below properties */}
      {boards.map((elem) => {
        <DashBoardCard
          boardID={elem._id}
          boardName={elem.name}
          // boardURL={`/api/board/getBoards/${userID}`}
        />;
      })}
    </div>
  );
};

export default Dashboard;

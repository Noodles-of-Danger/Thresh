import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./Navbar.jsx";
import Board from "./Board.jsx";
import DashBoardCard from "./DashBoardCard.jsx";

const Dashboard = () => {
  const userID = useContext(UserContext);

  const [boards, setBoards] = useState([]);
  // const [singleBoardDetails, setSingleBoardDetails] = useState([]);

  // const bundledBoardCards = [];
  const getUserBoards = async (userID) => {
    try {
      const response = await axios.get(`api/board/getBoards/${userID}`);
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

  // const getSingleBoardDetails = async (userID) => {
  //   try {
  //     const res = await axios.get(`api/board/getDetails/${userID}`);
  //     console.log(typeof res.data, res.data);
  //     return res;
  //     // setSingleBoardDetails(res.data);
  //   } catch (err) {
  //     err.message = "Error in getting a user board";
  //     console.log("err:", err);
  //   }
  // };

  // console.log(boards);
  const print = boards.map((elem) => {
    return (
      <DashBoardCard
        boardName={elem.name}
        boardID={elem._id}
        boardRoute={`boards/${elem._id}`}
        // boardDetails={elem} // TODO
      />
    );
  });

  return (
    <div className="w-screen h-screen grid items-center justify-center">
      {/* <br />
      <br />
      <br />
      <br />
      <br /> */}

      <div>
        {/* Board Creator Component(userID)
        {userID} */}
      </div>
      {/* Bundle up board cards here for presentation below using DashBoardCard component --- need to do CSS

      CONSTRUCT THIS from response.data <--- each array element is an object w. 3 below properties */}
      <div className="dashBoardCardGrid">{print}</div>
      <Board />
    </div>
  );
};

export default Dashboard;

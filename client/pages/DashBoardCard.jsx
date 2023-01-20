import React from "react";
import { Link } from "react-router-dom";

const DashBoardCard = ({ boardID, boardName, boardRoute, boardDetails }) => {
  return (
    <div className="dashBoardCard">
      TITLE HERE
      <div>Board Name: {boardName}</div>
      <div>
        <Link to={{ boardRoute }}> {boardRoute} </Link>
      </div>
      {/* <div>Board Details: {getSingleBoardDetails}</div> */}
    </div>
  );
};

export default DashBoardCard;

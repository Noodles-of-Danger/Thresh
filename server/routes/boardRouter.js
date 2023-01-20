const express = require("express");
const boardController = require("../controllers/boardController");

const router = express.Router();

//GET ALL TASKS
// Verify board cookie would be the middleware for this request once function previous function is implemented
//
router.get("/getBoards/:id", boardController.getAllBoards, (req, res, next) => {
  res.status(200).json(res.locals.allBoards);
});

router.get(
  "/getDetails/:id",
  boardController.getBoardDetails,
  (req, res, next) => {
    res.status(200).json(res.locals.boardDetails);
  }
);

router.get(
  "/getOneBoard/:boardid",
  boardController.getOneBoard,
  (req, res, next) => {
    res.status(200).json(res.locals.oneBoard);
  }
);

router.post(
  "/createBoard",
  boardController.createBoard,
  boardController.createBoardCookie,
  (req, res, next) => {
    res.status(200).json(res.locals.boardID);
  }
);

module.exports = router;

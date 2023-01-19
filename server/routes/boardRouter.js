const express = require("express");
const boardController = require("../controllers/boardController");

const router = express.Router();

//GET ALL TASKS
// Verify board cookie would be the middleware for this request once function previous function is implemented
//
router.get("/getBoards/:id", boardController.getAllBoards, (req, res, next) => {
  res.status(200).json(res.locals.allBoards);
});

router.post(
  "/createBoard",
  boardController.createBoard,
  boardController.createBoardCookie,
  (req, res, next) => {
    res.status(200).json(res.locals.boardID);
  }
);

module.exports = router;

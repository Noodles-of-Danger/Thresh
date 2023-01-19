const express = require('express');
const boardController = require('../controllers/boardController');

const router = express.Router();

//GET ALL TASKS
// Verify board cookie would be the middleware for this request once function previous function is implemented
//
router.post('/createBoard', boardController.createBoard, boardController.createBoardCookie, (req, res, next) => {
   res.status(200).json(res.locals.boardID);
});

router.get('/getBoards/:userid', boardController.getAllBoards, (req, res, next) => {
   res.status(200).json(res.locals.allBoards);
});

router.get('/getOneBoard/:boardid', boardController.getOneBoard, (req, res, next) => {
   res.status(200).json(res.locals.oneBoard);
});


module.exports = router;
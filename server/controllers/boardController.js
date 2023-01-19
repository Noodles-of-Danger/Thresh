const db = require("../models/db");

const boardController = {};

boardController.getAllBoards = async (req, res, next) => {
  // get userID
  console.log(req.params);

  try {
    const { id } = req.params;
    const text =
      // 'SELECT _boardid AS id, name AS name FROM joinuserboard INNER JOIN boards ON (joinuserboard._boardid=boards._id) WHERE _userid=$1'
      "SELECT Boards._id, Boards.name FROM joinuserboard INNER JOIN boards ON (joinuserboard._boardid=boards._id) WHERE _userid=$1";
    // const text = `
    //   SELECT Boards._id, Boards.name, Users._id
    //   FROM Boards
    //   INNER JOIN JoinUserBoard ON JoinUserBoard._boardID=Boards._id
    //   INNER JOIN Users ON Users._id=JoinUserBoard._userID
    //   WHERE Users._id=$1`;

    const data = await db.query(text, [id]);
    console.log(data.rows[0]);
    res.locals.allBoards = data.rows;
    return next();
  } catch (err) {
    return next({
      log: "boardController.getAllBoards error during get request " + err,
      message: {
        err: "An error occurred in boardController.getAllBoards middleware",
      },
    });
  }
};

// retrieve the userID, a request body that entails name of board
boardController.createBoard = async (req, res, next) => {
  const { _id, boardName } = req.body;
  const values1 = [boardName];

  try {
    const text1 = `INSERT INTO boards (name) VALUES ($1) RETURNING _id`;
    const text2 = `INSERT INTO joinuserboard (_userid, _boardid) VALUES ($1, $2)`;
    const { rows } = await db.query(text1, values1);
    const board = rows[0];
    await db.query(text2, [_id, board._id]);
    res.locals.boardID = board._id;
    return next();
  } catch (err) {
    return next({
      log: "boardController.createBoard error during create request " + err,
      message: {
        err: "An error occurred in boardController.createBoard middleware",
      },
    });
  }
};

boardController.createBoardCookie = (req, res, next) => {
  const boardID = res.locals.boardID;
  res.cookie("BID", boardID, { httpOnly: true, secure: true });
  return next();
};

// Will get to this once we are able to create a board AND create a board cookie for a user
// boardController.verifyBoardCookie = (req, res, next) => {

// }

// get this down to one SQL query
// const query =
//               `
//               WITH first_insert AS (
//                 INSERT INTO boards
//                   (name)
//                 VALUES
//                   ($1)
//                 RETURNING _id),
//               second_insert AS (
//                 INSERT INTO joinuserboard
//                   (_userid, _boardid)
//                 SELECT $2, _id FROM first_insert
//                 RETURNING _boardid
//               )`;

module.exports = boardController;

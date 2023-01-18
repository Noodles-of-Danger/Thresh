CREATE TABLE Users (_id serial PRIMARY KEY, username varchar NOT NULL, email varchar, password varchar NOT NULL, created_at timestamp DEFAULT NOW());

CREATE TABLE JoinUserBoard (_id serial PRIMARY KEY, _userID integer NOT NULL, _boardID integer NOT NULL);

CREATE TABLE JoinUserTask (_id serial PRIMARY KEY, _userID integer NOT NULL, _taskID integer NOT NULL);

CREATE TABLE Boards (_id serial PRIMARY KEY, name varchar, manager varchar);

CREATE TABLE Columns(_id serial PRIMARY KEY, columnName varchar, columnIndex integer NOT NULL, _boardID integer NOT NULL);

CREATE TABLE Tasks (_id serial PRIMARY KEY, title varchar, content varchar, index integer, status varchar, created_at timestamp DEFAULT NOW(), _boardID integer NOT NULL, _columnID integer NOT NULL);


// user + board

// Grabs all the employees based on the _boardID
// SELECT users.username AS username FROM users INNER JOIN joinuserboard ON joinuserboard._userID = users._userID INNER JOIN board ON joinuserboard._boardID = board._boardID;

// Grabs the manager name based on the boardID
// SELECT manager FROM board WHERE _boardID=1;

// Grabs the manager name based on the userID w/o knowing board ID
// SELECT board.manager FROM board INNER JOIN joinuserboard ON board._boardID = joinuserboard._boardID INNER JOIN users ON joinuserboard._userID = users._userID WHERE users._userID = 2;
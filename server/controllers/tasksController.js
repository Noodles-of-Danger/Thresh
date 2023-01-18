// const { io } = require('socket.io-client');
const db = require('../models/db');

const tasksController = {};

//Tasks (_id serial PRIMARY KEY, title varchar, content varchar, index integer, status varchar, created_at timestamp DEFAULT NOW(), _boardID integer NOT NULL, _columnID integer NOT NULL

//GET ALL TASKS CONTROLLER
tasksController.getTasks = (req, res, next) => {
  const text = 'SELECT * FROM tasks';
    db.query(text)
    .then(data => {
       // console.log('DATA: ', data);
        //console.log('DATA.ROWS: ', data.rows);
        res.locals.allTasks = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTasks' + err,
        message: {err: 'Error in taskController.getTasks'}
      })
    })

}
//GET ONE TASK CONTROLLER
tasksController.getTask = (req, res, next) => {
  const id = req.params.id //set ID primary key in table
    const text = `SELECT * FROM tasks WHERE id = $1`;
    db.query(text, id)
    .then(data => {
        console.log('DATA ', data.rows)
        res.locals.oneTask = data.rows
        return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.getTask' + err,
        message: {err: 'Error in taskController.getTask'}
      })
    })

}
//CREATE ONE TASK CONTROLLER
tasksController.createTask = (req,res,next) => {

  const {
    title,
    content,
    // create_date,
    // comment_id
  } = req.body

  // console.log(req.body);

  const query = `INSERT INTO tasks (title, content, _boardid)
    VALUES($1, $2, $3)
    RETURNING *`;

  const values = [
    title,
    content,
    1,
    // create_date
  ]

  db.query(query, values)
    .then(data => {
      console.log('data:', data.rows[0])
      res.locals.newTask = data.rows[0]
      // io.emit('newTodo', data.rows[0])
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.createTask ' + err,
        message: {err: 'Error in taskController.createTask'}
      })
    })
}
//DELETE ONE TASK CONTROLLER
tasksController.deleteTask = (req,res,next) => {
  const { id } = req.query //set ID primary key in table
  const text = `DELETE FROM tasks WHERE tasks._id = $1`
  db.query(text, [id])
    .then(data => {
      res.locals.deletedTask = data.rows;
      return next();
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.deleteTask' + err,
        message: {err: 'Error in taskController.deleteTask'}
      })
    })
}

//UPDATE ONE TASK CONTROLLER ---> not working yet
tasksController.updateTask = (req,res,next) => {
  const { id } = req.query; //set ID primary key in table
  const { title, content, status} = req.body;
  const values = [ title, content, status, id]
  const text = `UPDATE tasks SET title = $1, content = $2, status= $3 WHERE tasks.id = $4`;

  db.query(text, values)
    .then(data => {
      res.locals.updatedTask = data.rows;
      return next()
    })
    .catch(err => {
      next({
        status: 400,
        log: 'Error in taskController.updateTask',
        message: {err: 'Error in taskController.updateTask'}
      })
    })
}

module.exports = tasksController
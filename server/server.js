const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PORT = 3000;

// const verifyRouter = require('./routes/verifyRouter');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// Require routers
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const commentRouter = require('./routes/commentRouter');
const boardRouter = require('./routes/boardRouter');

// app.use('/dashboard', verifyRouter);
// ROUTE HANDLER
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);
app.use('/board', boardRouter);


// CATCH ALL ERROR HANDLER
app.use((req, res) => {
  res.status(404).json({ err: "file not found"})
})

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT , () => { console.log(`Listening on port ${PORT}...`); }); //log conected to port

module.exports = app;

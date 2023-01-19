const authController = {};

const jwt = require('jsonwebtoken');

authController.generateAuthToken = async (req, res, next) => {
  try {
    const token = await jwt.sign({ payload }, "shhhh it's our secret")
    res.locals.token = token;
    return next();
  } catch (err) {
    return next({
      log: 'authController.generateAuthToken error during get request ' + err,
      message: {err: 'An error occurred in boardController.getAllBoards middleware'}
    })
  }
};


authController.verifyJTW = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send('Unauthorized request');

  try {
    const payload = jwt.verify(token, "secretjwtKey");
    req.user = payload;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authController;
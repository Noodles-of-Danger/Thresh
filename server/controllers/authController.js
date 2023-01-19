const authController = {};

const jwt = require('jsonwebtoken');

authController.generateAuthToken = async (req, res, next) => {
  const {_id, username} = res.locals.oneUser
  try {
    const token = await jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 3),
      userid: _id,
      username: username
    }, "shhhh it's our secret")
    res.cookie('JWT', token, {httpOnly: true, secure: true});
    return next();
  } catch (err) {
    return next({
      log: 'authController.generateAuthToken error during get request ' + err,
      message: {err: 'unknown server error'}
    })
  }
};




authController.verifyJTW = (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    if (!token) throw new Error("no token found");
    const payload = jwt.verify(token, "shhhh it's our secret");
    //console.log("req params ", typeof req.params.userid, "payload ", typeof payload.userid)
    if (payload.userid !== Number(req.params.userid)) throw new Error("unable to verify");
    return next();
  }
  catch (err) {
    return next({
      log: 'authController.verifyJTW error during get request ' + err,
      status: 401,
      message: {err: 'access denied'}
    })
    // res.status(401).send('Invalid token');
  }
};

module.exports = authController;
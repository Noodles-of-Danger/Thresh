const { data } = require('autoprefixer');
const db = require('../models/db');
const usersController = {};
const bcrypt = require('bcrypt')
const WORKFACTOR = 15;

// EXAMPLE DATA:
// {
//     "fistName": "fname",
//     "lastName": "lname",
//     "password": "pass123",
//     "userRole": "role",
//     "email": "email"
// }

//CRYPT USER PASSWORD
usersController.getBcrypt = (req, res, next) => {
    const pass = req.body.password;
    bcrypt.hash(pass, WORKFACTOR)
        .then(hash => {
            req.body.password = hash;
            res.locals.user = req.body;
            return next();
        })
}


//GET ALL USERS CONTROLLER
usersController.getUsers = (req, res, next) => {
    const text = 'SELECT * FROM users;'
    db.query(text)
    .then(data => {
        console.log('DATA.ROWS: ', data.rows);
        res.locals.allUsers = data.rows
        return next()
    })
}
//GET ONE USER CONTROLLER
usersController.getUser = async (req, res, next) => {
    const { email, password } = req.body;
    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]

    try {
        // postgreSQL is a asynchronous by default - ignore vscode await error
        const response = await db.query(text, values);
        // storing input into res.locals.oneUser, response.rows is an array with one object
        res.locals.oneUser = response.rows[0];
        if (response.rows[0]) {
            const databasePw = res.locals.oneUser.password;

            // use bcrypt.compare to check password
            // verified = true if bcrypt.compare is successful
            const verified = await bcrypt.compare(password, databasePw);
            if (verified) {
                return next();
            } else return res.status(403).json('err');
        } else return res.status(403).json('err');
    } catch (err) {
        console.log(err)
    }
}
//CREATE ONE USER CONTROLLER
usersController.createUser = (req,res,next) => {

    // INSERT INTO users ( firstName,lastName, password, userRole, email) VALUES ( 'Roberto', 'Meloni', '1234', 'backend', 'myessmail@google');
    console.log(req.body)

    const { firstName, lastName, password, userRole, email } = req.body
    const text = `INSERT INTO users (firstName, lastName, password, username, email) VALUES ($1, $2, $3, $4, $4) RETURNING *;`
    const values = [ firstName, lastName, password, email]

    db.query(text, values)
    .then(data => {
        console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}
//DELETE ONE USER CONTROLLER
usersController.deleteUser = (req,res,next) => {
    const id = req.params.id
    const text = `DELETE FROM users WHERE _id = ${id};`

    db.query(text)
    .then(data => {
        console.log('User with id: ${id}deleted'+ data.rows)
        res.locals.deleteUser = data.rows
        return next()
    })


}

//UPDATE ONE USER CONTROLLER ---> if you get everything in req.body
usersController.updateUser = (req,res,next) => {
    console.log(req.body)
    console.log(req.params.id)
   // const text1 =  `SELECT * FROM users WHERE email = ${req.params.id}`
     const { firstName, lastName, password, userRole, email } = req.body
    const text = `UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', password = '${password}', userRole = '${userRole}', email= '${email}' WHERE ID = ${req.params.id}`
    //const values = [ firstName, lastName, password, userRole, email]
   console.log(req.body)
    db.query(text, values)
    .then(data => {
        console.log(data.rows)
        res.locals.newUser = data.rows
        return next()
    })
}

// usersController.verifyUser = (req, res, next) => {
//     //const { id } = req.params.id;
//     const { email, password } = req.body;
//     const text = `SELECT * from user WHERE email = ${email} `
//     db.query(text)
//         .then(data => {
//             res.locals.userId = data.ID.toString()
//             if (!data || data.password !== password) return res.redirect('/signup')
//             return next()
//         })
//         .catch(err => {
//             console.log(err),
//             next({
//               status: 400,
//               log: 'Error in usersController.verifyUser',
//               message: {err: 'Error in usersController.verifyUser', }
//             })
//           })
//         }

usersController.setID = (req, res, next) => {
    const id = res.locals.oneUser._id;
    res.cookie('UID', id, {httpOnly: true, secure: true});
    return next()
}


// Verify user is not working correctly
// usersController.verifyID = (req, res, next) => {
//     console.log('req-cookies', req.cookies);
//     console.log('hello from cookie');
//     const { id } = req.cookies;
//     const text = `SELECT * users WHERE ID = ${id}`
//     db.query(text)
//         .then(data => {
//             console.log('data', data);
//             return res.redirect('/login');
//         })
//     return next()
// }







module.exports = usersController;
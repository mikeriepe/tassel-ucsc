const userModel = require('./user_model.js');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// JWT Requires
const jwt = require('jsonwebtoken');
// The Json file is for development purposes only
const secrets = require('./secrets.json');


/**
 * POSTs a user object
 * @param {*} req
 * @param {*} res
 */
exports.userPost = async (req, res) => {
  console.log(req.body);
  const plaintextPassword = req.body.userpassword;
  const hash = bcrypt.hashSync(plaintextPassword, salt);
  req.body.userpassword = hash;
  newUUID = uuid.v4();

  const result = await userModel.createUser(req.body, newUUID);
  if (result == 1) {
    var user = { useremail: req.body.useremail, userid: newUUID, active: false }
    res.status(200).send(user);
  }
  else {
    res.status(500).send("user creation failed");
  }
};


/**
 * GETs user objects
 * @param {*} req
 * @param {*} res
 */
exports.userGet = async (req, res) => {
  const users = await userModel.getUsers();
  res.status(200).send(users);
};


/**
 * Dactivated user account
 * @param {*} req
 * @param {*} res
 */
exports.userDeactivate = async (req, res) => {
  const deactivatedUser = await userModel.userDeactivate(req.body);
  console.log(deactivatedUser);
  res.status(200).send(deactivatedUser);
};


/**
 * GETs user object and verifies login credentials before returning user object
 * @param {*} req
 * @param {*} res
 */
exports.userVerifyPost = async (req, res) => {
  console.log(req.body);
  const user = await userModel.getUser(req.body.useremail);
  console.log('user length = ' + user.length);
  if (user.length < 1) {
    res.status(401).send('Invalid username')
    return;
  }
  console.log(user);
  // eslint-disable-next-line max-len
  bcrypt.compare(req.body.userpassword, user[0].userpassword, function (err, isMatch) {
    if (err) {
      console.log('PW error');
      throw err;

    }
    else if (isMatch) {
      console.log('PW Match');
      delete user[0].userpassword;
      console.log(user[0]);

      // Signing a JWT Token, returned as a response
      const accessToken = jwt.sign(
        {
          userid: user[0].userid,
          useremail: user[0].useremail,
          active: user[0].active,
        },
        secrets.accessToken,
        {
          expiresIn: '60m',
          algorithm: 'HS256',
        }
      );
      
      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.status(200).send(user[0]);
    }
    else {
      console.log('PW Mismatch');
      res.status(401).send('Invalid password');
    }
  })

};

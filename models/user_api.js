const userModel = require('./user_model.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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
  if (result == 1)
  {
    var user = {useremail: req.body.useremail, userid: newUUID, active: false}
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
  const user = await userModel.getUser(req.body.useremail);
  // eslint-disable-next-line max-len
  const crypt = (bcrypt.compare(req.password, user.userpassword, function(err) {
    if (err) return 'error';
    return true;
  }));
  if (crypt != 'error') {
    delete user.userpassword;
    res.status(200).send(user[0]);
  }
};

const userModel = require('./user_model.js');
const profileModel = require('./profile_model.js');
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
  // console.log(req.body);
  const plaintextPassword = req.body.userpassword;
  const hash = bcrypt.hashSync(plaintextPassword, salt);
  req.body.userpassword = hash;
  newUUID = uuid.v4();

  const result = await userModel.createUser(req.body, newUUID);
  if (result == 1) {
    
    // Signing a JWT Token
     const verificationToken = jwt.sign(
      {
        useremail: req.body.useremail,
      },
      secrets.verificationToken,
      {
        expiresIn: '48h',
        algorithm: 'HS256',
      }
    );
    var user = { useremail: req.body.useremail, userid: newUUID, active: false, token: verificationToken }
     
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
exports.getActiveUsers = async (_, res) => {
  const users = await userModel.getActiveUsers();
  res.status(200).send(users);
};


/**
 * Dactivated user account
 * @param {*} req
 * @param {*} res
 */
exports.userDeactivate = async (req, res) => {
  const deactivatedUser = await userModel.userDeactivate(req.body);
  // console.log(deactivatedUser);
  res.status(200).send(deactivatedUser);
};


/**
 * GETs user object and verifies login credentials before returning user object
 * @param {*} req
 * @param {*} res
 */
exports.userVerifyPost = async (req, res) => {
  // console.log(req.body);
  const user = await userModel.getUser(req.body.useremail);
  // console.log('user length = ' + user.length);
  if (user.length < 1) {
    res.status(401).send('Invalid username')
    return;
  }
  // console.log(user);
  // eslint-disable-next-line max-len
  bcrypt.compare(req.body.userpassword, user[0].userpassword, function (err, isMatch) {
    if (err) {
      // console.log('PW error');
      throw err;

    }
    else if (isMatch) {
      // console.log('PW Match');
      delete user[0].userpassword;
      // console.log(user[0]);

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
      user[0].accessToken = accessToken;

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.status(200).send(user[0]);
    }
    else {
      // console.log('PW Mismatch');
      res.status(401).send('Invalid password');
    }
  })
};

/**
 * userVerifySession:
 * Called upon refresh / whenever the app loads.
 * This function is called AFTER JWT from HTTP Cookie has been verified.
 * @param {*} req 
 * @param {*} res 
 */
exports.verifyUserSession = async (req, res) =>{
  // console.log('This user has logged in before! Decoding JWT and sending back user info...');
  // Sends back the user data and profile data
  const userData = jwt.decode(req.cookies.accessToken);
  delete userData.iat;
  delete userData.exp;
  const profileData = await profileModel.getProfile(userData.userid);

  // console.log(userData);
  // console.log(profileData);

  res.status(200).send({
    user: userData,
    profile: profileData,
  })
}

/**
 * userExpireSession:
 * Used upon logout.
 */

exports.expireUserSession = async (req, res) =>{
  // console.log("Expiring a user's session...");
  res.cookie('accessToken',req.cookies.accessToken ,{maxAge: 0});
  res.status(200).send();
}


/**
 * A JWT Token signer for testing ONLY
 */

exports.getTestingToken = async (req,res) =>{
  const user = await userModel.getUser(req.body.useremail);
  // console.log('user length = ' + user.length);
  if (user.length < 1) {
    res.status(401).send('Invalid username')
    return;
  }
  // eslint-disable-next-line max-len
  bcrypt.compare(req.body.userpassword, user[0].userpassword, function (err, isMatch) {
    if (err) {
      // console.log('PW error');
      throw err;

    }
    else if (isMatch) {
      // console.log('PW Match');
      delete user[0].userpassword;
      // console.log(user[0]);

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
      // user[0].accessToken = accessToken;

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.status(200).send({'accessToken' : accessToken});
    }
    else {
      // console.log('PW Mismatch');
      res.status(401).send('Invalid password');
    }
  })
}

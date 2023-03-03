require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();



/**
 * Query to activate a specific user from the user table in
 * ACMatchMaker postgreSQL DB
 * @param {*} id
 */
 exports.activateUser = async (useremail) => {
  const query = {
    text: `UPDATE account
               SET active = $1
               WHERE useremail = $2`,
    values: [true, useremail],
  };
  const rows = await pool.query(query);
  return rows;
};

/**
 * Query to retrieve all users from the user table in ACMatchMaker postgreSQL DB
 */
exports.getActiveUsers = async () => {
  const query = {
    text: `SELECT * 
            FROM account
            WHERE active = true`,
  };
  const {rows} = await pool.query(query);
  return rows;
};

/**
 * Query to retrieve specific user from the user table in
 * ACMatchMaker postgreSQL DB
 * retrieves user whos useremail = email
 * @param {*} email
 */
exports.getUser = async (email) => {
  const query = {
    text: `SELECT * 
               FROM account
               WHERE useremail = $1 AND active = $2`,
    values: [email, true],
  };
  const {rows} = await pool.query(query);
  return rows;
};

/**
 * updateUser
 *      updates a user in the database
 *      Returns the updated user's id
 * @param {*} userData
 */
exports.updateUser= async (userData) => {
  // console.log(userData);
  const query = {
    text: `UPDATE account
          SET userid=($1), useremail=($2), userpassword=($3),
          active=($4), isadmin=($5), isapproved=($6)
          WHERE userid=($1)
          RETURNING userid`,
    values: [userData.userid, userData.useremail,
      userData.userpassword, userData.active,
      userData.isadmin,
      userData.isapproved],
  };

  // Returns the updated user object's id
  const {rows} = await pool.query(query);
  return rows[0].userid;
};

/**
 * Query to deactivate a specific user from the user table in
 * ACMatchMaker postgreSQL DB
 * @param {*} id
 */
exports.userDeactivate = async (userid) => {
  const query = {
    text: `UPDATE account
               SET active = $1
               WHERE userid = $2`,
    values: [userid.active, userid.userid],
  };
  const rows = await pool.query(query);
  console.log(rows);
  return rows;
};

/**
 * Query to create a new user in the user table in ACMatchMaker postgreSQL DB
 * @param {*} userInfo
 * @param {*} newUUID
 */
exports.createUser = async (userInfo, newUUID) => {
  const query = {
    text: `INSERT INTO account 
             (userid, useremail, userpassword, active) 
             VALUES (($1), ($2), ($3), ($4))`,
    values: [newUUID, userInfo.useremail, userInfo.userpassword,
      userInfo.active],
  };
  const rows = await pool.query(query);
  return rows.rowCount;
};


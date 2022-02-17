require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();


/**
 * Query to retrieve all users from the user table in ACMatchMaker postgreSQL DB
 */
exports.getUsers = async () => {
  const query = {
    text: `SELECT * 
          FROM users`,
  };
  const {rows} = await pool.query(query);
  return rows[0];
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
               FROM users
               WHERE useremail = $1`,
    values: [email],
  };
  const {rows} = await pool.query(query);
  return rows;
};

/**
 * Query to deactivate a specific user from the user table in
 * ACMatchMaker postgreSQL DB
 * @param {*} id
 */
exports.userDeactivate = async (userid) => {
  const query = {
    text: `UPDATE users
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
    text: `INSERT INTO users 
             (userid, useremail, userpassword, active) 
             VALUES (($1), ($2), ($3), ($4))`,
    values: [newUUID, userInfo.useremail, userInfo.userpassword,
      userInfo.active],
  };
  const rows = await pool.query(query);
  return rows.rowCount;
};

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
 * Query to delete a specific user from the user table in
 * ACMatchMaker postgreSQL DB
 * retrieves user whos userid = id
 * @param {*} id
 */
exports.userDelete = async (id) => {
  const query = {
    text: `DELETE 
               FROM users
               WHERE userid = $1`,
    values: [id],
  };
  const deletedRows = await pool.query(query);
  console.log(deletedRows);
  return deletedRows;
};

/**
 * Query to create a new user in the user table in ACMatchMaker postgreSQL DB
 * @param {*} userInfo
 * @param {*} newUUID
 */
exports.createUser = async (userInfo, newUUID) => {
  const query = {
    text: `INSERT INTO users 
             (userid, useremail, userpassword, usertype) 
             VALUES (($1), ($2), ($3), ($4))`,
    values: [newUUID, userInfo.useremail, userInfo.userpassword,
      userInfo.usertype],
  };
  const rows = await pool.query(query);
  console.log(rows);
  return rows;
};

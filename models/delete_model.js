require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE
// THESE ARE DELETE QUERIES ONLY FOR AUTOMATED TESTING NEVER HOST THESE ON A ROUTE

/**
 * Deletes a user from the user table
 * @param {*} data 
 */
exports.deleteUser = async (userid) =>{
    const query = {
        text: `DELETE FROM account
                WHERE userid = ($1)`,
        values: [userid],
      };
    const {rows} = await pool.query(query);
}


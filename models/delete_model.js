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

// /**
//  * Deletes a user from the user table
//  * @param {*} data 
//  */
// exports.deleteRequest = async (requestid) =>{
//   const query = {
//       text: `DELETE FROM request
//               WHERE requestid = ($1)`,
//       values: [requestid],
//     };
//   const {rows} = await pool.query(query);
// }

// exports.deleteRole = async (roleid) =>{
//   const query = {
//       text: `DELETE FROM role
//               WHERE roleid = ($1)`,
//       values: [roleid],
//     };
//   const {rows} = await pool.query(query);
// }


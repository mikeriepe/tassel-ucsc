require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getPendingOpportunities
 * gets request data associated with profile id provided
 * Returns the specified profiles requests sent to or from the user that are still active
 * @param {*} profileid
 */
 exports.getUserRequests= async (profileid) => {
  const query = {
    text: `SELECT *
           FROM requests
           WHERE requester = ($1) OR requestee = ($1)`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

// /**
//  * getRequestsToUser
//  * gets request data associated with profile id
//  * Returns the specified profiles requests sent to the user
//  * @param {*} profileid
//  */
//  exports.getUserRequests = async (profileid) => {
//   const query = {
//     text: `SELECT *
//            FROM requests
//            WHERE requestee = ($1)`,
//     values: [profileid],
//   };

//   const {rows} = await pool.query(query);
//   console.log(rows);
//   return rows;
// };
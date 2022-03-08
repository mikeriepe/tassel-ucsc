require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getPendingOpportunities
 * gets request data associated with profile id provided
 * Returns the specified profiles requests sent to or from the user that are still active
 * @param {*} profileid
 */
 exports.getPendingOpportunities= async (profileid) => {
  const query = {
    text: `SELECT requests.requester, requests.requestee, requests.requeststatus, events.*
           FROM requests
           INNER JOIN events ON ((requests.requester=events.eventid OR requests.requestee=events.eventid) AND (requests.requester = $1 OR requests.requestee = $1))`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

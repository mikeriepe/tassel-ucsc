require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Returns a list of all majors.
 */
exports.getAllMajors = async () =>{
    const query = {
        text: `SELECT * FROM major `,
        values: [],
      };

    const {rows} = await pool.query(query);
    return rows;
}

/**
 * Query to create a new major in the major table in ACMatchMaker postgreSQL DB
 * @param {*} opportunityInfo
 * @param {*} newUUID
 */
 exports.postMajor = async (majorInfo, newUUID) => {
  const query = {
    text: `INSERT INTO major 
             (majorid, majorname) 
             VALUES (($1), ($2))
             RETURNING majorid`,
    values: [newUUID, majorInfo.majorname],
  };
  const {rows} = await pool.query(query);
  //console.log(rows);
  return rows[0].majorid;
};

/**
 * Delete major requires majorid
 * @param {*} data 
 *  
 */
 exports.deleteMajor = async (majorid) => {
  const query = {
      text: `DELETE FROM major 
      WHERE majorid = $1`,
      values: [majorid],
  };
  const { rows } = await pool.query(query);
  // console.log(rows)
  return rows;
}
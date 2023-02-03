require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getOpportunityTypes
 * gets opportunity types
 * Returns list of opportunity types
 * @param {*} field
 */
 exports.getOpportunityTypes = async () => {
  const query = {
    text: `SELECT * FROM eventtype
           ORDER BY name ASC`,
  };

  const {rows} = await pool.query(query);
  return rows;
};

// /**
//  * DELETEs opportunity type of eventtypeid
//  * @param {*} field
//  */
// exports.deleteOpportunityType = async (data) => {
//   const query = {
//     text: `DELETE FROM eventtype
//            WHERE eventtypeid = ($1)`,
//     values: [data.eventtypeid],  
//   };
//   const {rows} = await pool.query(query);
//   console.log(`rows: ${rows}`);
//   return rows;
// };

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

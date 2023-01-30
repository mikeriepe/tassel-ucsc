require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getOrganizationTypes
 * gets organization type data
 * Returns list of organization types
 */
 exports.getOrganizationTypes = async () => {
  const query = {
    text: `SELECT * FROM organizationtype
           ORDER BY name ASC`,
  };

  const {rows} = await pool.query(query);
  return rows;
};

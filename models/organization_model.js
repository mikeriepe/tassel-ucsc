require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getOrganizations
 * gets organization data based on the provided organization type
 * Returns organizations by type
 * @param {*} field
 */
 exports.getOrganizations = async (type) => {
  const query = {
    text: `SELECT * FROM organization
           WHERE organizationtype = ($1)
           ORDER BY name ASC
           LIMIT 10`,
    values: [type],
  };

  const {rows} = await pool.query(query);
  return rows;
};

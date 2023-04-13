require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getKeywords
 * gets all keywords from DB
 * Returns list of keywords
 * @param {*} field
 */
 exports.getKeywords = async () => {
  const query = {
    text: `SELECT * FROM keywords
           ORDER BY value ASC`,
  };

  const {rows} = await pool.query(query);
  return rows;
};
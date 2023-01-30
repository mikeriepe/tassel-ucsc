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
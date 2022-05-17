require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Creates a post and inserts it into the Post table.
 * @param {*} data This data parameter is a json object that requires the following: opportunityid, userid, content.
 */
exports.insertPost = async (data) => {
    const query = {
        text: `INSERT INTO post(opportunityid, userid, content)
                VALUES ($1, $2, $3)
                RETURNING postid`,
        values: [data.opportunityid, data.userid, data.content],
    };
    const {rows} = await pool.query(query);
    // console.log(rows);
    return rows[0];
}

/**
 * Gets all posts for a specific opportunity id
 */
exports.getPost = async (data) => {
    const query = {
        text: `SELECT * FROM post WHERE opportunityid = ($1)`,
        values: [data.opportunityid],        
    }
    const {rows} = await pool.query(query);
    // console.log(rows);
    return rows;
}
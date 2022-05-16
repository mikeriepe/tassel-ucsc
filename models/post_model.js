require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Creates a post and inserts it into the Post table.
 * @param {*} data This data parameter is a json object that requires the following: opportunityid, userid, content.
 */
exports.insertPost = async (data) => {
    const query = {
        text: `INSERT INTO post(opportunityid, userid, content)`,
        values: [data.opportunityid, data.userid, data.content],
    };
    const {rows} = await pool.query(query);
    console.log(rows);
    return rows[0].postid;
}
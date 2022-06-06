require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Creates a post and inserts it into the comment table.
 * @param {*} data This data parameter is a json object that requires the following: postid, userid, content.
 */
exports.insertComment = async (data) => {
    const query = {
        text: `WITH insertedComment as (
            INSERT INTO comment(postid, userid, content, createddate)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            ) SELECT * FROM insertedComment
            JOIN profile ON insertedComment.userid = profile.userid
            `,
        values: [data.postid, data.userid, data.content, data.createddate],
    };
    const { rows } = await pool.query(query);
    // console.log(rows);
    return rows[0];
}

/**
 * Get comment for a specific post id
 * @param {*} data 
 *  
 */
exports.getComments = async (data) => {
    const query = {
        text: `SELECT *
        FROM comment 
        JOIN profile ON comment.userid = profile.userid
        WHERE postid = ($1)`,
        values: [data.postid],
    };
    const { rows } = await pool.query(query);
    return rows;
}
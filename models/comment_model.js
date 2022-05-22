require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Creates a post and inserts it into the comment table.
 * @param {*} data This data parameter is a json object that requires the following: postid, userid, content.
 */
 exports.insertComment = async (data) => {
    const query = {
        text: `INSERT INTO comment(postid, userid, content)
                VALUES ($1, $2, $3)
                RETURNING commentid`,
        values: [data.postid, data.userid, data.content],
    };
    const {rows} = await pool.query(query);
    // console.log(rows);
    return rows[0];
}

/**
 * Get comment for a specific post id
 * @param {*} data 
 *  
 */
exports.getComment = async (data) =>{
    const query = {
        text: `SELECT comment.commentid, comment.postid, comment.userid, comment.content, 
                      profile.major, profile.about, profile.profilepicture, profile.firstname, profile.lastname
        FROM comment 
        JOIN profile ON comment.userid = profile.userid
        WHERE postid = ($1)`,
        values: [data.postid],
    };
    const {rows} = await pool.query(query);
    return rows;
}
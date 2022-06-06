require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Creates a post and inserts it into the Post table.
 * @param {*} data This data parameter is a json object that requires the following: opportunityid, userid, content.
 */
exports.insertPost = async (data) => {
    const query = {
        // text: `INSERT INTO post(opportunityid, userid, content, title)
        //         VALUES ($1, $2, $3, $4)
        //         RETURNING *
        //         `,
        text: `WITH insertedPost as (
            INSERT INTO post(opportunityid, userid, content, title, createddate)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        ) SELECT * FROM insertedPost
        JOIN profile ON insertedPost.userid = profile.userid
        `,
        values: [data.opportunityid, data.userid, data.content, data.title,data.createddate],
    };
    const {rows} = await pool.query(query);
    // console.log(rows);
    return rows[0];
}

/**
 * Gets all posts for a specific opportunity id
 */
exports.getPosts = async (data) => {
    // console.log(data);
    const query = {
        text: `
        SELECT *
        FROM post
        JOIN profile ON post.userid = profile.userid 
        WHERE opportunityid = ($1)
        `,
        values: [data.opportunityid],        
    }
    const {rows} = await pool.query(query);
    // console.log(rows);
    return rows;
}
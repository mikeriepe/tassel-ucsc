require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Get the roles associated with an opportunityid
 * @param {*} data 
 * {
 *      'opportunityid' : Some valid opportunity id
 * }
 * 
 */
exports.getRoles = async (data) =>{
    const query = {
        text: `SELECT * 
        FROM role
        WHERE opportunityid = ($1)`,
        values: [data.opportunityid],
    };

    const {rows} = await pool.query(query);
    return rows;
};

/**
 * Insert a role row into the role table
 * @param {*} data 
 * {
 *      opportunityid : valid opportunity id,
 *      tagid:valid majorid,
 *      responsibility: A string description of the role,
 *      isfilled: boolean,
 *      userid: userid ONLY IF FILLED,
 * }
 */
exports.insertRole = async (data) =>{
    const query = {
        text: `INSERT INTO role(opportunityid, tagid, responsibility, isfilled, userid)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING roleid`,
        values: [data.opportunityid, data.tagid, data.responsibility, data.isfilled, data.userid],
    };
    const {rows} = await pool.query(query);
    return rows;
}

/**
 * Update whether a role has been filled or
 * @param {*} data
 * {
 *      roleid: <The id of the role>,
 *      userid: <the id of the user who filled the role>,
 * } 
 */
exports.updateRoleUserid = async (data) =>{
    const query = {
        text: `UPDATE role
        SET userid = ($2)
        WHERE roleid = ($1)
        RETURNING *
        `,
        values: [data.roleid, data.userid],
    };
    const {rows} = await pool.query(query);
    return rows;
} 
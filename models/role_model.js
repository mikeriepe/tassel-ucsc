require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

const uuid = require('uuid');

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
 *      rolename: a text,
 * }
 */
exports.insertRole = async (data) =>{
    const query = {
        text: `INSERT INTO role(opportunityid, tagid, responsibility, isfilled, userid, rolename, qualifications)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING roleid`,
        values: [data.opportunityid, data.tagid, data.responsibility, data.isfilled, null, data.rolename, data.qualifications],
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
 *      isfilled: true or false
 * } 
 */
exports.updateRoleFill = async (data) =>{
    const query = {
        text: `UPDATE role
        SET userid = ($2), isfilled = ($3)
        WHERE roleid = ($1)
        RETURNING *
        `,
        values: [data.roleid, data.userid, data.isfilled],
    };
    const {rows} = await pool.query(query);
    return rows;
} 
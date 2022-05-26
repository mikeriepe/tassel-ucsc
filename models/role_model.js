require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * Get the roles associated with an opportunityid
 * @param {*} data 
 * {
 *      'opportunityid' : <Some valid opportunity id>
 * }
 * 
 */
// exports.getRoles = async (data) =>{
//     const query = {
//         text: `SELECT * FROM role `,
//         values: [],
//       };
// };

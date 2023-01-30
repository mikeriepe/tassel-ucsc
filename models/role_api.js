const roleModel = require('./role_model');

/**
 * Returns the list of roles for a given opportunity
 * @param {*} req 
 * @param {*} res 
 * 
 * req.body should have: 
 * {
 *      'opportunityid' :Some valid opportunity id
 * }
 */
exports.getRoles = async (req, res) => {
    const roles = await roleModel.getRoles(
        {
            'opportunityid' : req.params.eventid,
        }
    );
    res.status(200).send(roles);
}

/**
 * Returns the newly created role id, 
 * @param {*} req 
 * @param {*} res 
 * {
 *      opportunityid : valid opportunity id,
 *      tagid:valid majorid,
 *      responsibility: A string description of the role,
 *      isfilled: boolean,
 *      userid: userid ONLY IF FILLED,
 * }
 */
exports.postRole = async(req, res) =>{
    // console.log("INSIDE POST ROLE");
    const roleid = await roleModel.insertRole(req.body);
    res.status(201).send(roleid);
}

/**
 * Updates the user who filled the role
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoleFill = async (req,res) =>{
    const role = await roleModel.updateRoleFill(req.body);
    res.status(200).send(role);
}

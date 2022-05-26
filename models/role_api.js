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
    const roles = await roleModel.getRoles(req.body);
    res.status(200).send(roles);
}
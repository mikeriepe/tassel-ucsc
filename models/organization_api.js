const organizationModel = require('./organization_model');

/**
 * GETs organizations
 * retrieves organizations based on the provided type.
 * @param {*} req
 * @param {*} res
 */
 exports.getOrganizations = async (req, res) => {
  // console.log(req.params.type);
  const organizations = await organizationModel.getOrganizations(req.params.type);
  res.status(201).send(organizations);
};

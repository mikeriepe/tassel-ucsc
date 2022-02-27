const organizationTypeModel = require('./organizationType_model');

/**
 * GETs organization types
 * retrieves all organization types
 * @param {*} req
 * @param {*} res
 */
 exports.getOrganizationTypes = async (req, res) => {
  const types = await organizationTypeModel.getOrganizationTypes();
  res.status(201).send(types);
};

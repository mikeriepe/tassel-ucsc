const opportunityTypeModel = require('./opportunityType_model');

/**
 * GETs opportunity types
 * retrieves opportunity types
 * @param {*} req
 * @param {*} res
 */
 exports.getOpportunityTypes = async (req, res) => {
  const opportunityTypes = await opportunityTypeModel.getOpportunityTypes();
  res.status(201).send(opportunityTypes);
};

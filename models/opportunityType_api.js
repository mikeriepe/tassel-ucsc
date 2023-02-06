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

// /**
//  * DELETEs opportunity type of eventTypeid
//  * @param {*} req
//  * req.body = {eventtypeid: 'valid eventtypeid'}
//  * @param {*} res
//  */
// exports.deleteOpportunityType = async (req, res) => {
//   await opportunityTypeModel.deleteOpportunityType(req.body);
//   res.status(200);
// };


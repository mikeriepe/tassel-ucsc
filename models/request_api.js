const requestModel = require('./request_model');
const uuid = require('uuid');


/**
 * GETs a request object
 * retrieves the requests associated with a specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getPendingOpportunities = async (req, res) => {
  console.log(req.params.profileid);
  const pending = await requestModel.getPendingOpportunities(req.params.profileid);
  res.status(201).send(pending);
};

/**
 * GETs requests
 * retrieves the requests associated with a specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getUserRequests = async (req, res) => {
  console.log(req.params.profileid);
  const requests = await requestModel.getUserRequests(req.params.profileid);
  res.status(201).send(requests);
};

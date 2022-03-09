const opportunityModel = require('./opportunity_model');
const uuid = require('uuid');

/**
 * GETs all opportunities
 * retrieves all active opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getOpportunities = async (_, res) => {
  const opportunities = await opportunityModel.getOpportunities();
  res.status(201).send(opportunities);
};

/**
 * GETs joined opportunities
 * retrieves the specified user's joined opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getJoinedOpportunities = async (req, res) => {
  console.log(req.params.profileid);
  const opportunities = await opportunityModel.getJoinedOpportunities(req.params.profileid);
  res.status(201).send(opportunities);
};

/**
 * GETs created opportunities
 * retrieves the specified user's created opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getCreatedOpportunities = async (req, res) => {
  console.log(req.params.profileid);
  const opportunities = await opportunityModel.getCreatedOpportunities(req.params.profileid);
  res.status(201).send(opportunities);
};

/**
 * GETs past opportunities
 * retrieves the specified user's past opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getPastOpportunities = async (req, res) => {
  console.log(req.params.profileid);
  const opportunities = await opportunityModel.getPastOpportunities(req.params.profileid);
  res.status(201).send(opportunities);
};

/**
 * POSTs a opportunity object
 * sends the newly created id back.
 * @param {*} req
 * @param {*} res
 */
 exports.postOpportunity = async (req, res) => {
  console.log(req.body);
  const newUUID = uuid.v4();
  try {
    const opportunityId = await opportunityModel.postOpportunity(req.body, newUUID);
    console.log(opportunityId);
    res.status(201).send(opportunityId);
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error creating opportunity')
  }
  
  
};




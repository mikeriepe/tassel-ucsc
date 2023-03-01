const opportunityModel = require('./opportunity_model');
const requestModel = require('./request_model');
const uuid = require('uuid');

/**
 * GETs all opportunities
 * retrieves all active opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getOpportunities = async (req, res) => {
  const opportunities = await opportunityModel.getOpportunities();
  // get pending opps
  const requests = await requestModel.getUserOutgoingRequests(req.params.profileid);
  const pendingOpps = [];
  for (let index = 0; index < requests.length; index++) {
    const opportunity = await opportunityModel.getOpportunity(requests[index].opportunityid);
    pendingOpps.push(opportunity);
  }
  //Find values that are in result1 but not in result2
  var uniqueResultOne = opportunities.filter(function(obj) {
    return !pendingOpps.some(function(objj) {
        if (obj !== undefined && objj !== undefined) {
          return obj.eventid == objj.eventid;
        }
        return false;
    });
  });
  res.status(201).send(uniqueResultOne);
};


/**
* UPDATE an opportunity
* sends the eventid back.
* @param {*} req
* @param {*} res
*/
exports.opportunityUpdate = async (req, res) => {
  // console.log(req.body.userid);
  try {
    const opportunityId = await opportunityModel.updateOpportunity(req.body);
    res.status(200).send({opportunityId});
  }
  catch (error) {
    // console.log(error);
    res.status(500).send('error updating opportunity')
  }

};

/**
 * GETs joined opportunities
 * retrieves the specified user's joined opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getJoinedOpportunities = async (req, res) => {
  // console.log(req.params.profileid);
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
  // console.log(req.params.profileid);
  const opportunities = await opportunityModel.getCreatedOpportunities(req.params.profileid);
  res.status(201).send(opportunities);
};

/**
 * GETs pending opportunities
 * retrieves opportunites that user requested to join
 * @param {*} req
 * @param {*} res
 */
 exports.getPendingOpportunities = async (req, res) => {
  // console.log(req.params.profileid);
  const requests = await requestModel.getUserOutgoingRequests(req.params.profileid);
  const pendingOpps = [];
  for (let index = 0; index < requests.length; index++) {
    if (requests[index].requeststatus === 'pending') {
      const opportunity = await opportunityModel.getOpportunity(requests[index].opportunityid);
      pendingOpps.push(opportunity);
    }
  }
  res.status(201).send(pendingOpps);
};

/**
 * GETs past opportunities
 * retrieves the specified user's past opportunities.
 * @param {*} req
 * @param {*} res
 */
 exports.getPastOpportunities = async (req, res) => {
  // console.log(req.params.profileid);
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
  // console.log(req.body);
  const newUUID = uuid.v4();
  try {
    const opportunityId = await opportunityModel.postOpportunity(req.body, newUUID);
    console.log(opportunityId);
    res.status(201).send({opportunityId});
  }
  catch (error) {
    // console.log(error);
    res.status(500).send('error creating opportunity')
  }
  
};

/**
 * GETs specified opportunity
 * retrieves opportunity based on the provided opportunity id.
 * @param {*} req
 * @param {*} res
 */
 exports.getOpportunity = async (req, res) => {
  // console.log(req.params.opportunityid);
  const opportunity = await opportunityModel.getOpportunity(req.params.opportunityid);
  res.status(201).send(opportunity);
};

/**
 * DELETEs a opportunity object
 * @param {*} req
 * @param {*} res
 */
 exports.deleteOpportunity = async (req, res) => {
  console.log(req.params.eventid);
  try {
    const opportunity = await opportunityModel.deleteOpportunity(req.params.eventid);
    res.status(200).json({message: 'opportunity deleted'});
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error deleting opportunity')
  }
  
};





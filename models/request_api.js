const requestModel = require('./request_model');
const opportunityModel = require('./opportunity_model');
const uuid = require('uuid');

/**
 * GETs requests
 * retrieves the requests associated with a specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getUserIncomingRequests = async (req, res) => {
  // console.log(req.params.profileid);
  try {
    const requests = await requestModel.getUserIncomingRequests(req.params.profileid);
    res.status(200).send(requests);
  }
  catch (err) {
    res.status(500).send('error getting incoming requests');
  }
};

/**
 * GETs requests
 * retrieves the requests associated with a specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getUserOutgoingRequests = async (req, res) => {
  // console.log(req.params.profileid);
  try {
    const requests = await requestModel.getUserOutgoingRequests(req.params.profileid);
    res.status(200).send(requests);
  }
  catch (err) {
    res.status(500).send('error getting outgoing requests');
  }
};

/**
 * GETs a request object
 * retrieves the request associated with a specified user profile and event id if one exists.
 * @param {*} req
 * @param {*} res
 */
 exports.getPendingRequest = async (req, res) => {
  // console.log(req.params.profileid);
  // console.log(req.params.eventid)
  try {
    const pending = await requestModel.getPendingRequest(req.params.profileid, req.params.eventid);
    res.status(200).send(pending);
  }
  catch (err) {
    res.status(500).send('error getting pending requests');
  }
};


/**
 * GETs a request object
 * retrieves the received requests associated with a specified event id amd profileid if any exist.
 * @param {*} req
 * @param {*} res
 */
 exports.getPendingRequestsReceived = async (req, res) => {
  try {
    const pending = await requestModel.getPendingRequestsReceived(req.params.profileid, req.params.eventid);
    res.status(200).send(pending);
  }
  catch (err) {
    res.status(500).send('error getting pending requests received');
  }
};


/**
 * GETs a request object
 * retrieves the sent requests associated with a specified event id and profile id if any exist.
 * @param {*} req
 * @param {*} res
 */
 exports.getPendingRequestsSent = async (req, res) => {
  try {
    const pending = await requestModel.getPendingRequestsSent(req.params.profileid, req.params.eventid);
    res.status(200).send(pending);
  }
  catch (err) {
    res.status(500).send('error getting pending requests sent');
  }
};


/**
 * GETs a request object
 * retrieves the approved requests associated with a specified event id amd profileid if any exist.
 * @param {*} req
 * @param {*} res
 */
 exports.getApprovedRequests = async (req, res) => {
  try {
    const approved = await requestModel.getApprovedRequests(req.params.profileid, req.params.eventid);
    res.status(200).send(approved);
  }
  catch (err) {
    res.status(500).send('error getting approved requests');
  }
};

/**
 * GETs a request object
 * retrieves the rejected requests associated with a specified event id amd profileid if any exist.
 * @param {*} req
 * @param {*} res
 */
 exports.getRejectedRequests = async (req, res) => {
  try {
    const rejected = await requestModel.getRejectedRequests(req.params.profileid, req.params.eventid);
    res.status(200).send(rejected);
  }
  catch (err) {
    res.status(500).send('error getting rejected requests');
  }
};


/**
 * POSTs a request object
 * sends the newly created id back.
 * @param {*} req
 * @param {*} res
 */
 exports.postRequest = async (req, res) => {
  try {
    const alreadySentRequests = await requestModel.getUserOutgoingRequests(req.body.requester);
    // for loop to check if a request already exists from this profile to this opportunity
    for(let i = 0; i < alreadySentRequests.length; i++) {
      if (alreadySentRequests[i].opportunityid === req.body.opportunityid) {
        res.status(409).send("a request already exists from this profile to this opportunity")
        return;
      }
    }
    const newUUID = uuid.v4();
    const requestId = await requestModel.postRequest(req.body, newUUID);
    // console.log(requestId);
    res.status(201).send(requestId);
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error creating request')
  }
};


/**
 * POSTs a request object
 * sets the specified request status to canceled
 * @param {*} req
 * @param {*} res
 */
 exports.cancelRequest = async (req, res) => {
  // console.log(req.body);
  try {
    const requestId = await requestModel.cancelRequest(req.body);
    console.log(requestId);
    res.status(200).send(requestId);
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error canceling request')
  }
  
};


/**
 * POSTs a request object
 * sets the specified request status to approved and adds the users profile id to the opportunity participants list and assigned roles
 * @param {*} req
 * @param {*} res
 */
 exports.approveRequest = async (req, res) => {
  try {
    const requestId = await requestModel.approveRequest(req.body);
    const event = await opportunityModel.getOpportunity(req.body.opportunityid);

    var users = new Array();
    var roles = new Array();

    users.push.apply(users, event.userparticipants);
    users.push(req.body.requester);
    roles.push.apply(roles, event.assignedroles[`${req.body.role}`]);
    roles.push(req.body.requester);

    const participantRoles = await opportunityModel.setParticipants(users, req.body.role, roles, req.body.opportunityid)

    res.status(200).send(requestId + event + participantRoles);
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error approving request')
  }
  
};


/**
 * POSTs a request object
 * sets the specified request status to rejected
 * @param {*} req
 * @param {*} res
 */
 exports.rejectRequest = async (req, res) => {
  // console.log(req.body);
  try {
    const requestId = await requestModel.rejectRequest(req.body);
    console.log(requestId);
    res.status(200).send(requestId);
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error rejecting request')
  }
  
};


/**
 * DELETEs a request object
 * @param {*} req
 * @param {*} res
 */
 exports.deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    await requestModel.deleteRequest(requestId);
    res.status(200).send();
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error rejecting request')
  }
  
};

require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getUserOutgoingRequests
 * gets request data associated with profile id provided
 * Returns the specified profiles requests sent to or from the user that are still active
 * @param {*} profileid
 */
 exports.getUserOutgoingRequests= async (profileid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE requester = ($1) AND toEvent = true`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
};

/**
 * getUserIncomingRequests
 * gets request data associated with profile id provided
 * Returns the specified profiles requests sent to or from the user that are still active
 * @param {*} profileid
 */
 exports.getUserIncomingRequests= async (profileid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE requestee = ($1) AND toEvent = false`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

/**
 * getPendingRequest
 * gets request data associated with profile id and opportunity id provided
 * Returns the specified profiles request for the specified opportunity if one exists
 * @param {*} profileid
 * @param {*} eventid
 */
 exports.getPendingRequest = async (profileid, eventid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE requester = ($1) AND opportunityid = ($2) AND requeststatus = ($3)`,
    values: [profileid, eventid, "pending"],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows[0];
};

/**
 * getPendingRequestsReceived
 * gets request data associated with opportunity id provided
 * Returns the requests received for the specified opportunity if any exist
 * @param {*} eventid
 */
 exports.getPendingRequestsReceived = async (profileid, eventid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE requestee = ($1) AND opportunityid = ($2) AND requeststatus = ($3)`,
    values: [profileid, eventid, "pending"],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};


/**
 * getPendingRequestsSent
 * gets request data associated with profile id and event idprovided
 * Returns the requests sent out by the specified profile if any exist
 * @param {*} eventid
 */
 exports.getPendingRequestsSent = async (profileid, eventid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE requester = ($1) AND opportunityid = ($2) AND requeststatus = ($3)`,
    values: [profileid, eventid, "pending"],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};


/**
 * getApprovedRequests
 * gets request data associated with opportunity id provided
 * Returns the approved requests for the specified opportunity if any exist
 * @param {*} eventid
 */
 exports.getApprovedRequests = async (profileid, eventid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE (requestee = ($1) OR requester = ($1)) AND opportunityid = ($2) AND requeststatus = ($3)`,
    values: [profileid, eventid, "approved"],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

/**
 * getRejectedRequests
 * gets request data associated with opportunity id provided
 * Returns the rejected requests for the specified opportunity if any exist
 * @param {*} eventid
 */
 exports.getRejectedRequests = async (profileid, eventid) => {
  const query = {
    text: `SELECT *
           FROM request
           WHERE (requestee = ($1) OR requester = ($1)) AND opportunityid = ($2) AND requeststatus = ($3)`,
    values: [profileid, eventid, "rejected"],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

/**
 * Query to create a new request in the request table in ACMatchMaker postgreSQL DB
 * @param {*} requestInfo
 * @param {*} newUUID
 */
 exports.postRequest = async (requestInfo, newUUID) => {
  var currentdate = new Date().toISOString();
  const query = {
    text: `INSERT INTO request
             (requestid, requestee, requester, requeststatus, requestdatetime, requestmessage, opportunityid, role, toevent) 
             VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9))
             RETURNING requestid`,
    values: [newUUID, requestInfo.requestee , requestInfo.requester, "pending", currentdate, requestInfo.requestmessage, requestInfo.opportunityid, requestInfo.role, requestInfo.toevent],
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows[0].requestid;
};


/**
 * Query to cancel an existing request in the request table in ACMatchMaker postgreSQL DB
 * @param {*} requestInfo
 */
 exports.cancelRequest = async (requestInfo) => {
  const query = {
    text: `UPDATE request
    SET requeststatus = $1
    WHERE requestid = $2`,
    values: ["canceled", requestInfo.requestid],
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};

/**
 * Query to approve an existing request in the request table in ACMatchMaker postgreSQL DB
 * @param {*} requestInfo
 */
 exports.approveRequest = async (requestInfo) => {
  var currentdate = new Date().toISOString();
  const query = {
    text: `UPDATE request
    SET requeststatus = $1, responsedatetime = $2
    WHERE requestid = $3`,
    values: ["approved", currentdate, requestInfo.requestid],
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};


/**
 * Query to reject an existing request in the request table in ACMatchMaker postgreSQL DB
 * @param {*} requestInfo
 */
 exports.rejectRequest = async (requestInfo) => {
  var currentdate = new Date().toISOString();
  const query = {
    text: `UPDATE request
    SET requeststatus = $1, responsedatetime = $2
    WHERE requestid = $3`,
    values: ["rejected", currentdate, requestInfo.requestid],
  };
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};


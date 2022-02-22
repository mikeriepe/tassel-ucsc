require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getJoinedOpportunities
 * gets opportunity data based on user profileid provided
 * Returns the specified user's joined opportunities
 * @param {*} profileid
 */
 exports.getJoinedOpportunities = async (profileid) => {
  const query = {
    text: `SELECT * FROM events 
           WHERE userparticipants ? $1
           AND active = true`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  return rows;
};

/**
 * getCreatedOpportunities
 * gets opportunity data based on user profileid provided
 * Returns the specified user's created opportunities
 * @param {*} profileid
 */
 exports.getCreatedOpportunities = async (profileid) => {
  const query = {
    text: `SELECT * FROM events 
           WHERE usersponsors->>'creator' = $1
           AND active = true`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
  return rows;
};


/**
 * getPastOpportunities
 * gets opportunity data based on user profileid provided
 * Returns the specified user's past opportunities
 * @param {*} profileid
 */
 exports.getPastOpportunities = async (profileid) => {
  const query = {
    text: `SELECT * FROM events 
           WHERE (userparticipants ? $1 OR usersponsors ? $1)
           AND active = false`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  return rows;
};


/**
 * Query to create a new opportunity in the opportunity table in ACMatchMaker postgreSQL DB
 * @param {*} opportunityInfo
 * @param {*} newUUID
 */
 exports.postOpportunity = async (opportunityInfo, newUUID) => {
  const query = {
    text: `INSERT INTO events 
             (eventid, usersponsors, remote, eventlocation, eventzoomlink, organization, description, eventtype, userparticipants, preferences, eventdata, startdate, enddate, active, eventbanner, eventname) 
             VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16))
             RETURNING eventid`,
    values: [newUUID, opportunityInfo[0].usersponsors.creator, opportunityInfo[0].remote, opportunityInfo[0].eventlocation, opportunityInfo[0].eventzoomlink, opportunityInfo[0].organization, opportunityInfo[0].description, opportunityInfo[0].eventtype, opportunityInfo[0].userparticipants, opportunityInfo[0].preferences, opportunityInfo[0].eventdata, opportunityInfo[0].startdate, opportunityInfo[0].enddate, true, opportunityInfo[0].eventbanner, opportunityInfo[0].eventname],
  };
  console.log(opportunityInfo[0]);
  const {rows} = await pool.query(query);
  console.log(rows);
  return rows[0].eventid;
};
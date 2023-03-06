require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * getOpportunities
 * gets ~~ACTIVE~~ opportunities
 * @param {*} profileid
 */
 exports.getOpportunities = async () => {
  const query = {
    text: `SELECT * FROM opportunity 
           WHERE active = true`,
    values: [],
  };

  const {rows} = await pool.query(query);
  return rows;
};

/**
 * getAllOpportunities
 * gets all opportunities
 * @param {*} profileid
 */
exports.getAllOpportunities = async () => {
  const query = {
    text: `SELECT * FROM opportunity`,
    values: [],
  };

  const {rows} = await pool.query(query);
  return rows;
};

/**
 * getJoinedOpportunities
 * gets opportunity data based on user profileid provided
 * Returns the specified user's joined opportunities
 * @param {*} profileid
 */
 exports.getJoinedOpportunities = async (profileid) => {
  const query = {
    text: `SELECT * FROM opportunity 
           WHERE ($1 = ANY(userparticipants))
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
    text: `SELECT * FROM opportunity 
           WHERE usersponsors->>'creator' = $1`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
};


/**
 * getPastOpportunities
 * gets opportunity data based on user profileid provided
 * Returns the specified user's past opportunities
 * @param {*} profileid
 */
 exports.getPastOpportunities = async (profileid) => {
  console.log('here ' + profileid);
  const query = {
    text: `SELECT * FROM opportunity 
           WHERE (($1 = ANY(userparticipants)) OR usersponsors->>'creator' = $1)
           AND active = false`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  // console.log('here ' + rows)
  return rows;
};


/**
 * Query to create a new opportunity in the opportunity table in ACMatchMaker postgreSQL DB
 * @param {*} opportunityInfo
 * @param {*} newUUID
 */
 exports.postOpportunity = async (opportunityInfo, newUUID) => {
  const query = {
    text: `INSERT INTO opportunity 
             (eventid, usersponsors, locationtype, eventlocation, eventzoomlink, organization, description, preferences, eventdata, startdate, enddate, active, eventbanner, eventname, userparticipants, organizationtype, opportunitytype, roles, starttime, endtime, subject, assignedroles) 
             VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20), ($21), ($22))
             RETURNING eventid`,
    values: [newUUID, opportunityInfo.usersponsors, opportunityInfo.locationtype, opportunityInfo.eventlocation, opportunityInfo.eventzoomlink, opportunityInfo.organization, opportunityInfo.description, opportunityInfo.preferences, opportunityInfo.eventdata, opportunityInfo.startdate, opportunityInfo.enddate, true, opportunityInfo.eventbanner, opportunityInfo.eventname, opportunityInfo.userparticipants, opportunityInfo.organizationtype, opportunityInfo.opportunitytype, opportunityInfo.roles, opportunityInfo.starttime, opportunityInfo.endtime, opportunityInfo.subject, opportunityInfo.assignedroles],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows[0].eventid;
};

/**
 * getOpportunity
 * gets opportunity data based on opportunity id provided
 * Returns the specified opportunity
 * @param {*} opportunityid
 */
 exports.getOpportunity = async (opportunityid) => {
  const query = {
    text: `SELECT * FROM opportunity 
           WHERE eventid = ($1)
           AND active = true`,
    values: [opportunityid],
  };

  const {rows} = await pool.query(query);
  return rows[0];
};


/**
* updateOpportunity
*      updates an opportunity in the database
*      Returns the updated opportunity's opportunity id
* @param {*} opportunity
*/
exports.updateOpportunity= async (opportunity) => {
  console.log(opportunity);
  const query = {
    text: `UPDATE opportunity
          SET usersponsors=($1), eventzoomlink=($2), organization=($3),
            description=($4), preferences=($5), active=($6),
            eventbanner=($7), eventname=($8), organizationtype=($9),
            opportunitytype=($10), startdate=($11), enddate=($12),
            roles=($13), starttime=($14), endtime=($15),
            locationtype=($16), eventlocation=($17), eventdata=($18),
            subject=($19), assignedroles=($20), userparticipants=($21)
          WHERE eventid=($22)
          RETURNING eventid`,
    values: [opportunity.usersponsors, opportunity.eventzoomlink, opportunity.organization,
      opportunity.description, opportunity.preferences, opportunity.active,
      opportunity.eventbanner, opportunity.eventname, opportunity.organizationtype,
      opportunity.opportunitytype, opportunity.startdate, opportunity.enddate,
      opportunity.roles, opportunity.starttime, opportunity.endtime,
      opportunity.locationtype, opportunity.eventlocation, opportunity.eventdata,
      opportunity.subject, opportunity.assignedroles, opportunity.userparticipants,
      opportunity.eventid
    ],
  };

  // Returns the newly created profile object's id
  const {rows} = await pool.query(query);
  // console.log("here" +rows[0].profileid);
  return rows[0].eventid;
};

/**
 * deleteOpportunities
 * deletes opportunity data based on opportunity id provided
 * Returns the user's past opportunities @param {*} opportunityInfo
 * @param {*} eventid
 */
exports.deleteOpportunity = async (eventid) => {
  const query = {
    text: `DELETE FROM opportunity 
          WHERE eventid = $1`,
    values: [eventid],
  };
  const {rows} = await pool.query(query);
  // console.log(rows[[0]]);
  return rows[0];
};

/**
 * 
 * Query to append an approved profile to the userparticipants field and assignedroles field in the event table in ACMatchMaker postgreSQL DB
 * @param {*} participantInfo
 */
 exports.setParticipants = async (userparticipants, role, roleassignment, eventid) => {
  const query = {
    text: `UPDATE opportunity
    SET userparticipants = $1, assignedroles = jsonb_set(assignedroles::jsonb, ($2::text[]), to_jsonb($3::text[]))
    WHERE eventid = $4`,
    values: [ userparticipants, '{ ' + `${role}` + '}' , roleassignment, eventid],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
};
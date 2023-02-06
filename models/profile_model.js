require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * createProfile
 *      Inserts a profile object into the database
 *      Returns the created profile id
 * @param {*} userid
 */
exports.createProfile= async (userInfo) => {
  const query = {
    text: `INSERT INTO profile 
            (userid, graduationyear, firstname, lastname)
            VALUES (($1), ($2), ($3), ($4))
            RETURNING profileid`,
    values: [userInfo.userid, userInfo.graduationyear, userInfo.firstname, userInfo.lastname],
  };

  // Returns the newly created profile object's id
  const {rows} = await pool.query(query);
  console.log('createProfile, profile created, new profileid:');
  console.log(rows[0].profileid);
  return rows[0].profileid;
};

/**
 * getProfile
 * gets user profile data based on user id provided
 * Returns the specified profile
 * @param {*} userid
 */
 exports.getProfile= async (userid) => {
  const query = {
    text: `SELECT * FROM profile`,
    values: [],
  };

  // const query = {
  //   text: `SELECT * FROM profile 
  //          WHERE userid = $1`,
  //   values: [userid],
  // };

  const {rows} = await pool.query(query);
  // caused errors with undefined .profileid
  // console.log('profileid = ' + rows[0].profileid);
  return rows[0];
};


/**
 * getProfile
 * gets user profile data based on profile id provided
 * Returns the specified profile
 * @param {*} userid
 */
 exports.getProfileByProfileId= async (profileid) => {
  const query = {
    text: `SELECT * FROM profile 
           WHERE profileid = $1`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  // console.log('profileid = ' + rows[0].profileid);
  return rows[0];
};

// /**
//  * getProfile
//  * gets user profile data based on profile id provided
//  * Returns the specified profile
//  * @param {*} userid
//  */
//  exports.getProfileByProfileId= async (profileid) => {
//   const query = {
//     text: `SELECT * FROM profile 
//            WHERE profileid = $1`,
//     values: [profileid],
//   };

//   const {rows} = await pool.query(query);
//   console.log('profileid = ' + rows[0].profileid);
//   return rows[0];
// };

/**
 * updateProfile
 *      updates a profile in the database
 *      Returns the updated profile's profile id
 * @param {*} userProfile
 */
exports.updateProfile= async (userProfile) => {
  // console.log(userProfile);
  const query = {
    text: `UPDATE profile
          SET userpreference=($1), graduationyear=($2), major=($3),
           experience=($4), volunteeringexperience=($5), about=($6),
           userlocation=($7), availability=($8),profilepicture=($9)
          WHERE userid=($10)
          RETURNING profileid`,
    values: [userProfile.userpreference, userProfile.graduationyear,
      userProfile.major, userProfile.experience,
      userProfile.volunteeringexperience,
      userProfile.about, userProfile.userlocation,
      userProfile.availability, userProfile.profilepicture,
      userProfile.userid],
  };

  // Returns the newly created profile object's id
  const {rows} = await pool.query(query);
  // console.log("here" +rows[0].profileid);
  return rows[0].profileid;
};


/**
 * profileGetName
 * gets user profile firstname and lastname based on profile id provided
 * Returns the specified profile's firstname and lastname
 * @param {*} userid
 */
 exports.profileGetName= async (profileid) => {
  const query = {
    text: `SELECT firstname, lastname, profilepicture, profileid FROM profile 
           WHERE profileid = $1`,
    values: [profileid],
  };

  const {rows} = await pool.query(query);
  // console.log('profile name = ' + rows[0].firstname + ' ' + rows[0].lastname[0] + '.');
  return rows[0];
};

/**
 * getProfilesForApproval
 * gets profile data for account approval
 * @returns {*} profiles
 */
 exports.getProfilesForApproval = async () => {
  const query = {
    text: `SELECT a.useremail, p.firstname, p.lastname,
            p.profilepicture, p.graduationyear, p.status,
            p.requestinfo, p.requestresponse
            FROM profile AS p
            LEFT JOIN account AS a
            ON p.userid = a.userid
            WHERE p.userid IN
              (SELECT userid FROM account)`,
  };
  // console.log('query');
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}

exports.changeProfileStatus = async (status, useremail) => {
  const query = {
    text: `UPDATE profile
           SET status = ($1)
           WHERE userid = 
             (SELECT userid FROM account WHERE useremail = ($2))`,
    values: [status, useremail],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}

exports.changeProfileStatusForRequest = async (status, request, useremail) => {
  console.log(status);
  const query = {
    text: `UPDATE profile
           SET status = ($1), requestinfo = ($2)
           WHERE userid = 
             (SELECT userid FROM account WHERE useremail = ($3))`,
    values: [status, request, useremail],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}

// post requestresponse, update status from 2 to 3
exports.changeProfileRequestResponse = async (status, response, profileid) => {
  const query = {
    text: `UPDATE profile
           SET status = ($1), requestresponse = ($2)
           WHERE profileid = ($3)`,
    values: [status, response, profileid],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  return rows;
}

// exports.deleteProfile = async (profileid) => {
//   const query = {
//     text: `DELETE FROM profile
//            WHERE profileid = $1`,
//     values: [profileid],
//   };
//   const {rows} = await pool.query(query);
//   // console.log(rows);
//   return rows;
// }


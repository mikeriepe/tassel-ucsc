require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool();

/**
 * createProfile
 *      Inserts a profile object into the database
 *      Returns the created profile id
 * @param {*} userid
 */
exports.createProfile= async (userid) => {
  const query = {
    text: `INSERT INTO profile 
            (userid)
            VALUES (($1))
            RETURNING profileid`,
    values: [userid],
  };

  // Returns the newly created profile object's id
  const {rows} = await pool.query(query);
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
    text: `SELECT * FROM profile 
           WHERE userid = $1`,
    values: [userid],
  };

  const {rows} = await pool.query(query);
  console.log('profileid = ' + rows[0].profileid);
  return rows[0];
};

/**
 * updateProfile
 *      updates a profile in the database
 *      Returns the updated profile's profile id
 * @param {*} userProfile
 */
exports.updateProfile= async (userProfile) => {
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
  console.log(rows[0].profileid);
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
  console.log('profile name = ' + rows[0].firstname + ' ' + rows[0].lastname[0] + '.');
  return rows[0];
};

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
  // const id = await pool.query(query).rows[0];
  return rows[0].profileid;
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

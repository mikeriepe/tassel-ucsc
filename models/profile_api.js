const profileModel = require('./profile_model');
const userModel = require('./user_model');

/**
 * POSTs a profile object
 * sends the newly created id back.
 * @param {*} req
 * @param {*} res
 */
exports.profilePost = async (req, res) => {
  console.log('profilePost req.body');
  console.log(req.body);
  const profileId = await profileModel.createProfile(req.body);
  res.status(201).send({profileId});
};

exports.getActiveProfiles = async (_, res) => {
  const activeUsers = await userModel.getActiveUsers();
  const activeProfiles = [];
  for (let ind = 0; ind < activeUsers.length; ind++) {
    const profile = await profileModel.getProfile(activeUsers[ind].userid);
    activeProfiles.push(profile);
  }
  res.status(201).send(activeProfiles);
};

/**
 * GETs a profile object
 * retrieves the specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getProfile = async (req, res) => {
  // console.log(req.params.userid);
  const profile = await profileModel.getProfile(req.params.userid);
  res.status(201).send(profile);
};


/**
 * GETs a profile object
 * retrieves the specified user profile.
 * @param {*} req
 * @param {*} res
 */
 exports.getProfileByProfileId = async (req, res) => {
  // console.log(req.params.profileid);
  const profile = await profileModel.getProfileByProfileId(req.params.profileid);
  res.status(201).send(profile);
};

// /**
//  * GETs a profile object
//  * retrieves the specified user profile.
//  * @param {*} req
//  * @param {*} res
//  */
//  exports.getProfileByProfileId = async (req, res) => {
//   console.log(req.params.profileid);
//   const profile = await profileModel.getProfileByProfileId(req.params.profileid);
//   res.status(201).send(profile);
// };

/**
 * Updates a profile object
 * sends the profile id back.
 * @param {*} req
 * @param {*} res
 */
exports.profileUpdate = async (req, res) => {
  // console.log(req.body.userid);
  const profileId = await profileModel.updateProfile(req.body);
  res.status(200).send({profileId});
};


/**
 * GETs a profile first and last name
 * retrieves the specified user profile's firstname and lastname.
 * @param {*} req
 * @param {*} res
 */
 exports.profileGetName = async (req, res) => {
  // console.log(req.params.profileid);
  const profile = await profileModel.profileGetName(req.params.profileid);
  res.status(201).send(profile);
};

/**
 * getProfilesforApproval:
 * gets profiles for approval page
 * @param {*} _ request
 * @param {*} res response
 */
 exports.getProfilesForApproval = async (_, res) => {
  const profiles = await profileModel.getProfilesForApproval();
  res.status(200).send(profiles);
}

exports.changeProfileStatus = async (req, res) => {
  const {useremail, status} = req.body;
  // console.log('gothere');
  // const isapproved = status == 4 ? true : false;
  const profile = await profileModel.changeProfileStatus(status, useremail);
  res.status(200).send(profile); // this just sends back an empty []
}

exports.changeProfileStatusForRequest = async (req, res) => {
  const {useremail, status, requestinfo} = req.body;
  const profile = await
    profileModel.changeProfileStatusForRequest(status, requestinfo, useremail);
  res.status(200).send(profile); // this just sends back an empty []
}

exports.changeProfileRequestResponse = async (req, res) => {
  const {status, response, profileid} = req.body;
  const profile = await
    profileModel.changeProfileRequestResponse(status, response, profileid);
  res.status(200).send(profile); // this just sends back an empty []
}

// /**
//  * deletes profile profile of profileid
//  * @param {*} req request
//  * @param {*} res response
//  */
// exports.deleteProfile = async (req, res) => {
//   try {
//     const { profileid } = req.body;
//     // get requestid's of all requests where request.requester = profileid
//     // delete those requests
//     // delete Profile
//     await profileModel.deleteProfile(profileid);
//     res.status(200).send();
//   } catch (error) {
//     console.log(`error deleting post ${error}`);
//     res.status(500).send({ message: 'error deleting post' });
//   }
// }





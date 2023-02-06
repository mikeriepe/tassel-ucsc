const express = require('express');
/** Required to parse cookies containing JWTs
 * ---------------------------------------------------
 *  express-jwt is a plugin for express to handle JWT
 *  cookie-parser allows for cookies to be read in from the 'req' parameters
 *  secrets is DEV environment only, DO NOT USE in production
 */
const jwt = require('express-jwt');
const cookieParser = require('cookie-parser')
const jsonwebtoken = require('jsonwebtoken');
const secrets = require('./models/secrets.json');

const path = require('path');

// User API
const userApi = require('./models/user_api');

// Profile API
const profileApi = require('./models/profile_api');

// Opportunity API
const opportunityApi = require('./models/opportunity_api');

// Request API
const requestApi = require('./models/request_api');

// AUTH API 
const authApi = require('./models/auth_api');

// Organization Type API
const organizationTypeApi = require('./models/organizationType_api');

// Organization API
const organizationApi = require('./models/organization_api');

// OpportunityType API
const opportunityTypeApi = require('./models/opportunityType_api');

// Post api
const postApi = require('./models/post_api');

// Post api
const commentApi = require('./models/comment_api');

// Major API
const majorApi = require('./models/major_api');

// Role API
const roleApi = require('./models/role_api');


require('dotenv').config();

const app = express();
app.use(express.json());

/** This is for setting up the cookie parser and express jwt
 */
 app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers',
  );
  next();
});


//   User CRUD operations
//
//
app.get('/api/users', authApi.check, userApi.getActiveUsers);

app.post('/api/login', userApi.userVerifyPost);

app.post('/api/userDeactivation', authApi.check, userApi.userDeactivate);

app.post('/api/userCreation', userApi.userPost);

app.get('/api/verifyUserSession', authApi.check, userApi.verifyUserSession);

app.get('/api/expireUserSession', authApi.check, userApi.expireUserSession);


//  Profile CRUD operations
//
//
app.get('/api/getActiveProfiles', authApi.check, profileApi.getActiveProfiles);

app.post('/api/profileCreation', profileApi.profilePost);

app.get('/api/getProfile/:userid', authApi.check, profileApi.getProfile);

app.get('/api/getProfileByProfileId/:profileid', authApi.check, profileApi.getProfileByProfileId);

app.post('/api/updateProfile', authApi.check, profileApi.profileUpdate);

app.get('/api/getProfileName/:profileid', authApi.check, profileApi.profileGetName);

app.get('/api/getProfilesForApproval', authApi.check, profileApi.getProfilesForApproval);

app.post('/api/changeProfileStatus', authApi.check, profileApi.changeProfileStatus);

app.post('/api/changeProfileStatusForRequest', authApi.check, profileApi.changeProfileStatusForRequest);

app.post('/api/changeProfileRequestResponse', authApi.check, profileApi.changeProfileRequestResponse);

// app.delete('/api/deleteProfile', authApi.check, profileApi.deleteProfile);


//  Opportunity CRUD operations
//
//
app.get('/api/getOpportunities', authApi.check, opportunityApi.getOpportunities);

app.get('/api/getJoinedOpportunities/:profileid', authApi.check, opportunityApi.getJoinedOpportunities);

app.get('/api/getCreatedOpportunities/:profileid', authApi.check, opportunityApi.getCreatedOpportunities);

app.get('/api/getPendingOpportunities/:profileid', authApi.check, opportunityApi.getPendingOpportunities);

app.get('/api/getPastOpportunities/:profileid', authApi.check, opportunityApi.getPastOpportunities);

app.post('/api/postOpportunity', authApi.check, opportunityApi.postOpportunity);

app.get('/api/getOpportunity/:opportunityid', authApi.check, opportunityApi.getOpportunity);

app.delete('/api/deleteOpportunity/:eventid', authApi.check, opportunityApi.deleteOpportunity);

// Request CRUD operations
//
//
app.get('/api/getUserOutgoingRequests/:profileid', authApi.check, requestApi.getUserOutgoingRequests);

app.get('/api/getUserIncomingRequests/:profileid', authApi.check, requestApi.getUserIncomingRequests);

app.get('/api/getPendingRequest/:profileid/:eventid', authApi.check, requestApi.getPendingRequest);

app.get('/api/getPendingRequestsReceived/:profileid/:eventid', authApi.check, requestApi.getPendingRequestsReceived);

app.get('/api/getPendingRequestsSent/:profileid/:eventid', authApi.check, requestApi.getPendingRequestsSent);

app.get('/api/getApprovedRequests/:profileid/:eventid', authApi.check, requestApi.getApprovedRequests);

app.get('/api/getRejectedRequests/:profileid/:eventid', authApi.check, requestApi.getRejectedRequests);

app.post('/api/postRequest', authApi.check, requestApi.postRequest);

app.post('/api/cancelRequest', authApi.check, requestApi.cancelRequest);

app.post('/api/approveRequest', authApi.check, requestApi.approveRequest);

app.post('/api/rejectRequest', authApi.check, requestApi.rejectRequest);

app.delete('/api/deleteRequest', authApi.check, requestApi.deleteRequest);

// OrganizationType CRUD operations
//
//
app.get('/api/getOrganizationTypes', authApi.check, organizationTypeApi.getOrganizationTypes);

// Organizations CRUD operations
//
//
app.get('/api/getOrganizations/:type', authApi.check, organizationApi.getOrganizations);

// OpportunityType CRUD operations
//
//
app.get('/api/getOpportunityTypes', authApi.check, opportunityTypeApi.getOpportunityTypes);

// app.delete('/api/deleteOpportunityType', authApi.check, opportunityTypeApi.deleteOpportunityType);


//  Preferences CRUD operations
//
//

//  Feedback CRUD operations
//
//

//  Event type CRUD operations
//
//


// Post CRUD operations
// 
// 
app.post('/api/postPost', authApi.check, postApi.postPost);

app.get('/api/getPosts/:eventid', authApi.check, postApi.getPosts);

app.delete('/api/deletePost', authApi.check, postApi.deletePost);

// Comment CRUD operation
//
//
app.post('/api/postComment', authApi.check, commentApi.postComment);

app.get('/api/getComments/:postid', authApi.check, commentApi.getComments);

app.delete('/api/deleteComment/:commentid', authApi.check, commentApi.deleteComment);

// Major CRUD Operations
//
//
app.get('/api/getMajors', authApi.check, majorApi.getMajors);

app.post('/api/postMajor', authApi.check, majorApi.postMajor);

app.delete('/api/deleteMajor/:majorid', authApi.check, majorApi.deleteMajor);

// Role CRUD operation
//
//
app.get('/api/getRoles/:eventid', authApi.check, roleApi.getRoles );

app.post('/api/postRole', authApi.check, roleApi.postRole );

app.put('/api/updateRoleFill', authApi.check, roleApi.updateRoleFill);

app.delete('/api/deleteRole', authApi.check, roleApi.deleteRole);

// AUTH
//
// just returns the JWT token upon authentication success
app.get('/api/dummy', authApi.check, authApi.dummy);

app.get('/api/verify/:token', authApi.verify); // verifies the jwt token used in the route




// redirects any other paths to the client
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function (req, res) {
  console.log('trying to redirect to client build');
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


const port = process.env.PORT || 3001;
const server = app.listen(port);
console.log('App is listening on port ' + port);

/**
 * TESTING SERVER HOSTING (*This is for JEST/ Supertest purposes)
 * COMMENT THIS FOR PRODUCTION
 * UNCOMMENT THIS FOR TESTING
 */
module.exports = server;

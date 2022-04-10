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
app.get('/api/users', userApi.getActiveUsers);

app.post('/api/login', userApi.userVerifyPost);

app.post('/api/userDeactivation', userApi.userDeactivate);

app.post('/api/userCreation', userApi.userPost);

app.get('/api/verifyUserSession', authApi.check, userApi.verifyUserSession);


//  Profile CRUD operations
//
//
app.get('/api/getActiveProfiles', profileApi.getActiveProfiles);

app.post('/api/profileCreation', profileApi.profilePost);

app.get('/api/getProfile/:userid', profileApi.getProfile);

app.get('/api/getProfileByProfileId/:profileid', profileApi.getProfileByProfileId);

app.put('/api/updateProfile', profileApi.profileUpdate);

app.get('/api/getProfileName/:profileid', profileApi.profileGetName)

//  Opportunity CRUD operations
//
//
app.get('/api/getOpportunities', opportunityApi.getOpportunities);

app.get('/api/getJoinedOpportunities/:profileid', opportunityApi.getJoinedOpportunities);

app.get('/api/getCreatedOpportunities/:profileid', opportunityApi.getCreatedOpportunities);

app.get('/api/getPendingOpportunities/:profileid', opportunityApi.getPendingOpportunities);

app.get('/api/getPastOpportunities/:profileid', opportunityApi.getPastOpportunities);

app.post('/api/postOpportunity', opportunityApi.postOpportunity);

app.get('/api/getOpportunity/:opportunityid', opportunityApi.getOpportunity);

app.delete('/api/deleteOpportunity/:eventid', opportunityApi.deleteOpportunity);

// Request CRUD operations
//
//
app.get('/api/getUserOutgoingRequests/:profileid', requestApi.getUserOutgoingRequests);

app.get('/api/getUserIncomingRequests/:profileid', requestApi.getUserIncomingRequests);

app.get('/api/getPendingRequest/:profileid/:eventid', requestApi.getPendingRequest);

app.get('/api/getPendingRequestsReceived/:profileid/:eventid', requestApi.getPendingRequestsReceived);

app.get('/api/getPendingRequestsSent/:profileid/:eventid', requestApi.getPendingRequestsSent);

app.get('/api/getApprovedRequests/:profileid/:eventid', requestApi.getApprovedRequests);

app.get('/api/getRejectedRequests/:profileid/:eventid', requestApi.getRejectedRequests);

app.post('/api/postRequest', requestApi.postRequest);

app.post('/api/cancelRequest', requestApi.cancelRequest);

app.post('/api/approveRequest', requestApi.approveRequest);

app.post('/api/rejectRequest', requestApi.rejectRequest);

// OrganizationType CRUD operations
//
//
app.get('/api/getOrganizationTypes', organizationTypeApi.getOrganizationTypes);

// Organizations CRUD operations
//
//
app.get('/api/getOrganizations/:type', organizationApi.getOrganizations);

// OpportunityType CRUD operations
//
//
app.get('/api/getOpportunityTypes', opportunityTypeApi.getOpportunityTypes);

//  Preferences CRUD operations
//
//

//  Feedback CRUD operations
//
//

//  Event type CRUD operations
//
//

// AUTH test 
//
// just returns the JWT token upon authentication success
app.get('/api/dummy', authApi.check, authApi.dummy);



// redirects any other paths to the client
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function (req, res) {
  console.log('trying to redirect to client build');
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port);
console.log('App is listening on port ' + port);

/**
 * TESTING SERVER HOSTING (*This is for JEST/ Supertest purposes)
 * COMMENT THIS FOR PRODUCTION
 * UNCOMMENT THIS FOR TESTING
 */
module.exports = app

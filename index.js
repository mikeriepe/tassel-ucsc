const express = require('express');
const path = require('path');

// User API
const userApi = require('./models/user_api');

// Profile API
const profileApi = require('./models/profile_api');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
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
app.get('/api/users', userApi.userGet);

app.post('/api/login', userApi.userVerifyPost);

app.delete('/api/userDeletion', userApi.userDelete);

app.post('/api/userCreation', userApi.userPost);


//  Profile CRUD operations
//
//
app.post('/api/profileCreation', profileApi.profilePost);

app.put('/api/updateProfile', profileApi.profileUpdate);
//  Event CRUD operations
//
//

//  Preferences CRUD operations
//
//

//  Feedback CRUD operations
//
//

//  Event type CRUD operations
//
//


// redirects any other paths to the client
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function(req, res) {
  console.log('trying to redirect to client build');
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log('App is listening on port ' + port);

// DEBUG
/*
profileModel.createProfile(
    {
      'userid': `82f2d80c-a9ff-49c9-a0d7-7b8edfcfb24c`,
    },
);
*/

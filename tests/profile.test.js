// FIXME: profile.test.js relies on certain profiles being in the db

const app = require("../index");
const supertest = require("supertest");
const uuid = require('uuid');
const deleteModel = require('../models/delete_model');

// beforeAll(() => {
//     jest.setTimeout(15*1000);
// });

afterEach(async() => { 
    await app.close();
});


// This is the req.body data
const loginData = {
  useremail: "dev18@gmail.com",
  userpassword: "pass",
};

// PLEASE READ: this test requires that at least 1 'active' user row and profile row with matching userid exist in the db
test(`GET all active profiles`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    // call getActiveProfiles
    await supertest(app).get('/api/getActiveProfiles')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(201)
        .then((response) => {
            // console.log(response.body);
            expect(response.body[0].profileid !== undefined).toEqual(true);
            expect(response.body[0].status !== undefined).toEqual(true);
        });
});

// PLEASE READ: this test requires that at least 1 profile row 
// with userid 2a5fd658-ac17-4491-b1aa-2cad640e40ea exists in the db
test(`GET a profile by userid`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    // call getProfile
    await supertest(app).get('/api/getProfile/2a5fd658-ac17-4491-b1aa-2cad640e40ea')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(201)
        .then((response) => {
            // console.log(response.body);
            expect(response.body.profileid !== undefined).toEqual(true);
            expect(response.body.userid !== undefined).toEqual(true);
            expect(response.body.status !== undefined).toEqual(true);
        });
});

// PLEASE READ: this test requires that at least 1 profile row 
// with profileid 363622ec-7331-456b-b59d-de4bd45d0fa8 exists in the db
test(`GET a profile by profileid`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call getProfileByProfileId
    await supertest(app).get('/api/getProfileByProfileId/363622ec-7331-456b-b59d-de4bd45d0fa8')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(201)
        .then((response) => {
            // console.log(response.body);
            expect(response.body.profileid !== undefined).toEqual(true);
            expect(response.body.userid !== undefined).toEqual(true);
            expect(response.body.status !== undefined).toEqual(true);
        });
});

// PLEASE READ: this test requires that at least 1 profile row 
// with profileid 363622ec-7331-456b-b59d-de4bd45d0fa8 exists in the db
test(`GET a profile firstname, lastname, pic by profileid`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call getProfileName
    await supertest(app).get('/api/getProfileName/363622ec-7331-456b-b59d-de4bd45d0fa8')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(201)
        .then((response) => {
            // console.log(response.body);
            expect(response.body.profileid !== undefined).toEqual(true);
        });
});

// PLEASE READ: requires an profile table entry with useremail dev18@gmail.com
test(`GET a profiles/user fields for approval`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call getProfilesForApproval
    await supertest(app).get('/api/getProfilesForApproval')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(200)
        .then((response) => {
            // console.log(response.body);
            expect(response.body[0].useremail !== undefined).toEqual(true); 
            expect(response.body[0].firstname !== undefined).toEqual(true);
            expect(response.body[0].lastname !== undefined).toEqual(true);
            expect(response.body[0].profilepicture !== undefined).toEqual(true);
            expect(response.body[0].graduationyear !== undefined).toEqual(true);
            expect(response.body[0].status !== undefined).toEqual(true);
            expect(response.body[0].requestinfo !== undefined).toEqual(true);
            expect(response.body[0].requestresponse !== undefined).toEqual(true);
        });
});

// PLEASE READ: requires an profile table entry with useremail dev18@gmail.com
test(`UPDATE profile status`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call changeProfileStatus
    await supertest(app).post('/api/changeProfileStatus')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({useremail: 'dev18@gmail.com', status: 4})
        .expect(200);
});

// PLEASE READ: requires an profile table entry with useremail dev18@gmail.com
test(`UPDATE profile status for request`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call changeProfileStatusForRequest
    await supertest(app).post('/api/changeProfileStatusForRequest')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({useremail: 'dev18@gmail.com', status: 4, requestinfo: 'need phone number'})
        .expect(200);
});

// PLEASE READ: requires an profile table entry with profileid '038f4043-2f73-40d3-9b70-30c50c5d0fce'
test(`UPDATE profile status for request response`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
        //   console.log(response.body);
        //   jwt = response.body.accessToken;
        //   console.log(jwt);
        return response.body;
        });
    
    // call changeProfileRequestResponse
    await supertest(app).post('/api/changeProfileRequestResponse')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({status: 4, response: '*a phone number*', profileid: '038f4043-2f73-40d3-9b70-30c50c5d0fce'})
        .expect(200);
});

// PLEASE READ: requires an profile table entry with userid 'e1d241e0-ec3e-46d6-86a4-e1ef3cf3c49d'
test(`UPDATE profile`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
            //   console.log(response.body);
            //   jwt = response.body.accessToken;
            //   console.log(jwt);
            return response.body;
        });

    // call profileUpdate
    await supertest(app).post('/api/updateProfile')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({
            userpreference: { 'preference1': 'advice panel' }, graduationyear: '1998',
            major: 'Computer Engineering', experience: {"job1": {"end": "2015", "start": "2005", "title": "Software Developer", "company": "Apple", "location": "Cupertino, CA", "description": "Responsible for developing, and testing software. Also Responsible for testing vendor software.", "currentposition": false}, "job2": {"end": "2004", "start": "2004", "title": "Summer Software Developer Intern", "company": "Microsoft", "location": "Redmond, WA", "description": "Responsible for developing, and testing software. Presented work at the end of the internship.", "currentposition": false}},
            volunteeringexperience: {"experience1": "UCSC student hackathon judge", "experience2": "UCSC student mentorship", "experience3": "UCSC club guest speaker"},
            about: 'Experienced Software Developer who graduated from UCSC with a BS in Computer Science in 1997. Over 15+ years in the Software Engineering field. Interested in volunteering as much as 5 times per year and open to all types of volunteering oppertunities.', userlocation: 'Santa Cruz, CA',
            availability: {"days": {"day1": "mondays", "day2": "thursdays"}, "hours": {"mondays": "9am-5pm", "Thursdays": "8am-1pm"}, "yearly": 5}, profilepicture: 'https://thumbs.dreamstime.com/b/profile-picture-smiling-male-employee-posing-workplace-close-up-headshot-portrait-smiling-caucasian-businessman-look-190961990.jpg',
            userid: 'e1d241e0-ec3e-46d6-86a4-e1ef3cf3c49d'
        })
        .expect(200)
        .then((response) => {
            console.log(response.body);
            expect(response !== undefined).toEqual(true);
        });
});

// PLEASE READ: must change the the email on line 263
// before running test to avoid duplicates in db
test(`POST Profile`, async () => {
    // GET A JWT FIRST
    const logininfo = await supertest(app)
        .post("/api/login")
        .send(loginData)
        .expect(200)
        .then((response) => {
            //   console.log(response.body);
            //   jwt = response.body.accessToken;
            //   console.log(jwt);
            return response.body;
        });

    // create a new user
    let myUserId = await supertest(app).post('/api/userCreation')
        // .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({userpassword: 'Password', useremail: `${uuid.v4()}@uuid.com`, active: false})
        .expect(200)
        .then((response) => {
            console.log(response.body);
            expect(response !== undefined).toEqual(true);
            return response.body.userid;
        });

    // call profileCreation
    await supertest(app).post('/api/profileCreation')
        // .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send({userid: myUserId})
        .expect(201)
        .then((response) => {
            console.log(response.body);
            expect(response.body.profileId !== undefined).toEqual(true);
        });

    // FIXME: call delete user (which will delete profile aswell)
    await deleteModel.deleteUser(myUserId);
});










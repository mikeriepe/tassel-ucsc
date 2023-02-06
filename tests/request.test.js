const app = require("../index");
const supertest = require("supertest");
const delete_model = require('../models/delete_model');
const request_model = require('../models/request_model');

afterEach(async() => { 
    await app.close();
});

const loginData = {
    useremail: "dev18@gmail.com",
    userpassword: "pass",
}

test("Login using a dev account", async () => {
  const logininfo = await supertest(app)
    .post("/api/login")
    .send(loginData)
    .expect(200)
    .then((response) => {
    //   console.log(response.body);
    //   jwt = response.body.accessToken;
    //   console.log(jwt);
      //console.log(response.body)
      return response.body;
    });

    // README: this data is then only one of the 3 that is not initially in the db.
    // It gets inserted and then deleted by the test.
    const data = {
        'requestee': 'cfbb760e-4b2e-44b7-aeab-4e04c7db4da7',
        'requester': '038f4043-2f73-40d3-9b70-30c50c5d0fce',
        'requeststatus': 'approved',
        'requestresponse': '',
        'requestdatetime': '2022-03-08 21:02:20.312 -0800',
        'responsedatetime': '2022-03-14 22:39:57.247 -0700',
        'requestmessage': 'Hello, I am interested in volunteering for this event. I have 3+ years of experience working in computer engineering and would love the chance to mentor students. My email is email@gmail.com if you have any further questions.',
        'opportunityid': 'cf8f63f2-718e-49f6-837e-24728b9d3afe',
        'role': 'Lead Judge',
        'toevent': false,
    };

    const data2 = {
        'requestee': '038f4043-2f73-40d3-9b70-30c50c5d0fce',
        'requester': 'cfbb760e-4b2e-44b7-aeab-4e04c7db4da7',
        'requeststatus': 'pending',
        'requestresponse': '',
        'requestdatetime': '2022-03-14 17:50:23.799 -0700',
        'responsedatetime': '',
        'requestmessage': 'I would like to volunteer please',
        'opportunityid': '25949134-7fb4-4bbe-832f-ec63ae54fc03',
        'role': '',
        'toevent': true,
    };
    
    const data3 = {
        'requestee': '038f4043-2f73-40d3-9b70-30c50c5d0fce',
        'requester': 'cfbb760e-4b2e-44b7-aeab-4e04c7db4da7',
        'requeststatus': 'rejected',
        'requestresponse': '',
        'requestdatetime': '2022-03-14 17:58:15.718 -0700',
        'responsedatetime': '2022-03-19 11:31:28.127 -0700',
        'requestmessage': 'Hello, I am interested in volunteering for this event. I have 3+ years of experience working in computer engineering and would love the chance to mentor students. My email is email@gmail.com if you have any further questions.',
        'opportunityid': 'cf8f63f2-718e-49f6-837e-24728b9d3afe',
        'role': '',
        'toevent': false,
    };

    const faulty = {
        'requestee': '0',
        'requester': '0',
        'requeststatus': 'fault',
        'requestresponse': '',
        'requestdatetime': '0',
        'responsedatetime': '',
        'requestmessage': 'fault',
        'opportunityid': '0',
        'role': '',
        'toevent': false,
    }
    

    // get all requests
    let requestId = '';
    await supertest(app).post('/api/postRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        //console.log("breakpoint");
        console.log(response.body);
        requestId = response.body.requestId;
        console.log(requestId);
    });

    await supertest(app).get(`/api/getUserIncomingRequests/${data.requestee}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        expect(response.body[response.body.length - 1].requestee).toEqual(data.requestee);
    });

    await supertest(app).get(`/api/getUserOutgoingRequests/${data2.requester}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        console.log(response.body);
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        expect(response.body[response.body.length - 1].requester).toEqual(data2.requester);
    });

    //delete_model.deleteRole(logininfo.roleid);

    
    await supertest(app).get(`/api/getPendingRequest/${data2.requester}/${data2.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        expect(response.body.requeststatus).toEqual(data2.requeststatus);
    });
    
    await supertest(app).get(`/api/getPendingRequestsReceived/${data2.requestee}/${data2.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        //console.log(response.body.requeststatus);
        expect(response.body[response.body.length - 1].requeststatus).toEqual(data2.requeststatus);
    });
    
    
    await supertest(app).get(`/api/getPendingRequestsSent/${data2.requester}/${data2.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        //console.log(response.body.requeststatus);
        expect(response.body[response.body.length - 1].requeststatus).toEqual(data2.requeststatus);
    });

    
    await supertest(app).get(`/api/getRejectedRequests/${data3.requester}/${data3.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        //console.log(response.body);

        expect(response.body[response.body.length - 1].requeststatus).toEqual(data3.requeststatus);
    });
    
    await supertest(app).post(`/api/cancelRequest/`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': requestId})
    .expect(200)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    
    
    await supertest(app).post('/api/approveRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': requestId, 'opportunityid': data.opportunityid})
    .expect(200)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    await supertest(app).get(`/api/getApprovedRequests/${data.requester}/${data.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        console.log(response.body.requeststatus);
        expect(response.body[response.body.length - 1].requeststatus).toEqual(data.requeststatus);
    });

    await supertest(app).post('/api/rejectRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': requestId})
    .expect(200)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    // delete the request
    // await delete_model.deleteRequest(requestId);
    await supertest(app).delete(`/api/deleteRequest`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': requestId})
    .expect(200);

    // INVOKE ERRORS ON REQUEST API FUNCTIONS
    await supertest(app).post(`/api/cancelRequest/`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': ''})
    .expect(500)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    await supertest(app).post('/api/approveRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': '', 'opportunityid': ''})
    .expect(500)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    await supertest(app).post('/api/rejectRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'requestId': ''})
    .expect(500)
    .then((response) =>{
        //console.log(requestid)
        console.log(response.body)

        //data.requeststatus = 'canceled';
    });

    await supertest(app).post('/api/postRequest')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send()
    .expect(500)
    .then((response) =>{
        //console.log("breakpoint");
        console.log(response.body);
        requestId = response.body.requestid;
        console.log(requestId);
    });

});

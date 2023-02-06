const app = require("../index");
const supertest = require("supertest");

afterEach(async() => { 
    await app.close();
});

it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
})

const loginData = {
    'useremail': 'dev18@gmail.com',
    'userpassword': 'pass'
}
let userinfo = {};

test("Get Opportunities with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });

    await supertest(app).get(`/api/getOpportunities`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        //console.log(response.body);
    })
});

test("Get Joined Opportunities with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });
    // the id below belongs to Chad Chaddwick
    const profileid = 'cfbb760e-4b2e-44b7-aeab-4e04c7db4da7'
    await supertest(app).get(`/api/getJoinedOpportunities/${profileid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        //console.log(response.body);
    })
});

test("Get Created Opportunities with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });
    // the id below belongs to Chad Chaddwick
    const profileid = 'cfbb760e-4b2e-44b7-aeab-4e04c7db4da7'
    await supertest(app).get(`/api/getCreatedOpportunities/${profileid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        //console.log(response.body);
    })
});

test("Get Pending Opportunities with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });
    // the id below belongs to Chad Chaddwick
    const profileid = '038f4043-2f73-40d3-9b70-30c50c5d0fce'
    await supertest(app).get(`/api/getPendingOpportunities/${profileid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        //console.log(response.body);
    })
});

test("Get Past Opportunities with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });
    // the id below belongs to Chad Chaddwick
    const profileid = '038f4043-2f73-40d3-9b70-30c50c5d0fce'
    await supertest(app).get(`/api/getPastOpportunities/${profileid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        // console.log(response.body);
    })
});

test("Post Opportunity and delete with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });

    const newOpportunity = {
        'usersponsors' : '{"creator": "038f4043-2f73-40d3-9b70-30c50c5d0fce"}',
        'organization' : 'Tassel BE Team',
        'description': 'New engineers needed',
        'eventbanner': 'https://freerangestock.com/sample/132099/golden-microphone.jpg',
        'eventname': 'Tassel BE Team',
        'opportunitytype': 'Career Support',
        'startdate': '2023-01-24',
        'enddate': '2023-03-01',
        'starttime': '2023-01-24T11:30:00.535Z',
        'endtime': '2023-03-01T11:30:00.535Z',
        'locationtype': 'hybrid',
        'enddate': '2023-03-01',
        'eventzoomlink': '',
        'organization': '',
        'preferences': '{}',
        'organizationtype': '',
        'roles': '{}',
        'eventlocation': '{}',
        'eventdata': '',
        'subject': '',
        'assignedroles': '{}',
        'userparticipants': '{}',
    }
    let newOpportunityId;
    await supertest(app).post(`/api/postOpportunity`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(newOpportunity)
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunity id on terminal
        newOpportunityId = response.body.opportunityId;
        console.log(newOpportunityId);
    })
    // delete the created opportunity
    await supertest(app).delete(`/api/deleteOpportunity/${newOpportunityId}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        console.log(response.body);
    })

});

test("Post Opportunity with incompatible data and return 500", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });

    const newOpportunity = {
        'usersponsors' : '038f4043-2f73-40d3-9b70-30c50c5d0fce',
        'organization' : 'Tassel BE Team',
        'description': 'New engineers needed',
        'eventbanner': 'https://freerangestock.com/sample/132099/golden-microphone.jpg',
        'eventname': 'Tassel BE Team',
        'opportunitytype': 'Career Support',
        'startdate': '2023-01-24',
        'enddate': '2023-03-01',
        'starttime': '2023-01-24T11:30:00.535Z',
        'endtime': '2023-03-01T11:30:00.535Z',
        'locationtype': 'hybrid',
        'enddate': '2023-03-01',
        'eventzoomlink': null,
        'organization': null,
        'preferences': null,
        'organizationtype': null,
        'roles': null,
        'eventlocation': null,
        'eventdata': null,
        'subject': null,
        'assignedroles': null,
        'userparticipants': null,
    }
    const createdOpportunity = await supertest(app).post(`/api/postOpportunity`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(newOpportunity)
    .expect(500)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        // console.log(response.body);
    })
});

test("Post Opportunity get the specified opportunity and delete with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });

    const newOpportunity = {
        'usersponsors' : '{"creator": "038f4043-2f73-40d3-9b70-30c50c5d0fce"}',
        'organization' : 'Tassel BE Team',
        'description': 'New engineers needed',
        'eventbanner': 'https://freerangestock.com/sample/132099/golden-microphone.jpg',
        'eventname': 'Tassel BE Team',
        'opportunitytype': 'Career Support',
        'startdate': '2023-01-24',
        'enddate': '2023-03-01',
        'starttime': '2023-01-24T11:30:00.535Z',
        'endtime': '2023-03-01T11:30:00.535Z',
        'locationtype': 'hybrid',
        'enddate': '2023-03-01',
        'eventzoomlink': '',
        'organization': '',
        'preferences': '{}',
        'organizationtype': '',
        'roles': '{}',
        'eventlocation': '{}',
        'eventdata': '',
        'subject': '',
        'assignedroles': '{}',
        'userparticipants': '{}',
    }
    let newOpportunityId;
    
    await supertest(app).post(`/api/postOpportunity`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(newOpportunity)
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunity id on terminal
        // console.log(response.body);
        newOpportunityId = response.body.opportunityId;
    })

    // Get the specified opportunity
    await supertest(app).get(`/api/getOpportunity/${newOpportunityId}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        console.log(response.body);
    })

    // delete the created opportunity
    await supertest(app).delete(`/api/deleteOpportunity/${newOpportunityId}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        // console.log(response.body);
    })

});

test("Invalid delete request with JWT token", async ()=>{
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });
    let invalidOpportunityId = '032f4043-40d3-4b70-30c30c1d0fce';
    
    // delete the invalid opportunity
    await supertest(app).delete(`/api/deleteOpportunity/${invalidOpportunityId}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(500)
    .then((response) =>{
        // Uncomment the line below to output the opportunities on terminal
        //console.log(response.body);
    })

});
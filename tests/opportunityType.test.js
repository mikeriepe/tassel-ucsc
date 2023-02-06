// PLEASE READ: THIS TESTING FILE REQUIRES THAT AT LEAST 1 opportunityType IS IN THE DB

const app = require("../index");
const supertest = require("supertest");

afterEach(async() => { 
    await app.close();
});


// This is the req.body data
const loginData = {
  useremail: "dev18@gmail.com",
  userpassword: "pass",
};

// GET opportunityTypes
test(`GET all opportunityTypes`, async () => {
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

    // Get organizationsTypes
    await supertest(app).get('/api/getOpportunityTypes')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .expect(201)
        .then((response) => {
            // console.log(response.body);
            expect(response.body[0].eventtypeid !== undefined).toEqual(true);
            expect(response.body[0].name !== undefined).toEqual(true);
        });
});



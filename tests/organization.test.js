// PLEASE READ: THIS TESTING FILE REQUIRES THAT AT LEAST 1 ORGANIZATION OF TYPE 'Academic' IS IN THE DB

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

// GET organizations
test(`GET organizations of type 'Academic'`, async () => {
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

    // Get <=10 organizations of type 'Academic'
    await supertest(app).get('/api/getOrganizations/Academic')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(201)
    .then((response) =>{
        // console.log(response.body);
        expect(response.body[0].organizationtype).toEqual('Academic');
        expect(response.body[0].organizationid !== undefined).toEqual(true);
        expect(response.body[0].name !== undefined).toEqual(true);
    });
});



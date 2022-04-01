const app = require("../index");
const supertest = require("supertest");


it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})

// Unit test set up example
test("GET users", async () => {
    // Calls the HTTP route
    await supertest(app).get("/api/users")
        // What response code is it supposed to get?
        .expect(200)
        // What does the actual response code look like?
        .then((response)=>{
            // Does the response.body return with the correct data?
            // Note: response.body is either an array of json objects or a singular json object if successful.
            expect(response.body[0].active).toBe(true)
        })
});


/**
 * Example http tests featuring a body as part of the request
 */

// This is the req.body data
const loginData = {
    'useremail': 'dev18@gmail.com',
    'userpassword': 'pass'
}
test("Login using a dev account", async()=>{
    await supertest(app).post("/api/login")
        // Sends data via the body of the http request (req.body)
        .send(loginData)
        .expect(200)
        .then((response) =>{
            // In this case, this http route only returns a singular object
            expect(response.body.useremail).toBe(loginData.useremail)
        })
});


// Test using faulty data
const faultyLoginData1 = {
    'useremail': 'dev18@gmail.com',
    'userpassword': 'pas'
}
test("Login using faulty info", async()=>{
    await supertest(app).post("/api/login")
        .send(faultyLoginData1)
        .expect(401)
});

// Test using faulty data (email)
const faultyLoginData2 = {
    'useremail': 'dev18@mail.com',
    'userpassword': 'pass'
}
test("Login using faulty info", async()=>{
    await supertest(app).post("/api/login")
        .send(faultyLoginData2)
        .expect(401)
});

// User creation: we may need a delete user api route before we test user creation.
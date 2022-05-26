const app = require("../index");
const supertest = require("supertest");

afterEach(async() => { 
    await app.close();
});

it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
})

// This is the req.body data
const loginData = {
    'useremail': 'dev18@gmail.com',
    'userpassword': 'pass'
}
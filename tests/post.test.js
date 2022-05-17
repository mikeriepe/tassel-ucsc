const app = require("../index");
const supertest = require("supertest");

afterEach(async() => { 
    await app.close();
});

it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
})



// Temporary JWT token holder
const loginData = {
    'useremail': 'dev18@gmail.com',
    'userpassword': 'pass'
}
let userinfo = {};

test("JWT Token get", async () => {
    await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
        userinfo = response.body;
    });
});


// AUTH CHECK
// NO JWT, EXPECTING A 401
test("Post post without JWT", async ()=>{
    await supertest(app).post('/api/postPost')
    .expect(401)
    .then(()=>{
        // console.log(userinfo);
    });
});


// just using a opportunity id from the db. REPLACE LATER

// Posting a post with a JWT
test("Post post without JWT", async ()=>{
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
        // console.log(response.body);
        // jwt = response.body.accessToken;
        // console.log(jwt);
       return response.body;
    });

    // console.log(logininfo);
    const data = {
        'opportunityid' : 'c6feb949-9ea4-4a65-9e36-8acc9fac151d',
        'userid' : logininfo.userid,
        'content' : 'THERE IS NO COW LEVEL',
    }
    console.log(data);
    await supertest(app).post('/api/postPost')
    .set('Cookie', [`accessToken=${userinfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        console.log(response.body);
    });
});



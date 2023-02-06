const app = require("../index");
const delete_model = require('../models/delete_model');
const role_model = require('../models/role_model');
const supertest = require("supertest");

afterEach(async() => { 
    await app.close();
});


// This is the req.body data
const loginData = {
  useremail: "dev18@gmail.com",
  userpassword: "pass",
};

// Insert Role API Test
test(`Insert a role with a JWT, 
        and get the roles from the same opportunity, 
        and then update it`, async () => {
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

    const data = {
        'opportunityid': 'c6feb949-9ea4-4a65-9e36-8acc9fac151d', // THIS MAY NEED TO BE CHANGED IF OPPORTUNITIES BREAK
        'tagid': '2079d724-19e0-44f7-ba8f-bd81429c0ab2', // The computer science FK
        'responsibility': 'Parameterized Get API Route',
        'isfilled': false,
        'userid': '',
        'rolename': 'super smart software engineer',
        'qualifications' : ["Cow level", "Black Sheep Wall", "CWAL"]
    };

    // Get all roles for the given opportunity
    let roleid ='';
    await supertest(app).post('/api/postRole')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        roleid = response.body[0].roleid;
    });

    // Checks if the content is the same
    await supertest(app).get(`/api/getRoles/${data.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // The most recent inserted row should be at the end of the array
        // console.log(response.body[response.body.length - 1]);
        expect(response.body[response.body.length - 1].rolename).toEqual(data.rolename);
    });

    // Updating the created role with a participant 
    await supertest(app).put('/api/updateRoleFill')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({
        'roleid' : roleid,
        'userid' : logininfo.userid,
        'isfilled' : true,
    })
    .expect(200)
    .then((response) =>{
        // console.log(response.body);
    });

    // delete_model.deleteRole(logininfo.roleid); //FIXME: (Collin) gonna need an explaination on this 1
    await supertest(app).delete('/api/deleteRole')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send({'roleId': roleid})
    .expect(200);
});

/*
const { Pool, Client } = require('pg')
 
// pools will use environment variables
// for connection information
const pool = new Pool()

const query = {
  text: 'INSERT INTO role(responsibility, isfilled, rolename, qualifications) VALUES($1, $2)',
  values: ['testing...', false, 'testing again...', ['final', 'test']],
}
 
// callback
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
 
// promise
client
  .query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

const query = {
  text: 'DELETE FROM role WHERE responsibility='testing'',
}
 
// callback
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
 
// promise
client
  .query(query)
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))
 
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

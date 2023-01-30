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
test("Post post with JWT", async ()=>{
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

    // console.log(logininfo);
    const data = {
        'opportunityid' : 'c6feb949-9ea4-4a65-9e36-8acc9fac151d',
        'userid' : logininfo.userid,
        'content' : 'THERE IS NO COW LEVEL',
        'title': 'Instant victory',
        'createddate': new Date().toISOString(),
    }
    // console.log(data);

    // SET THE JWT COOKIE BEFORE CALLING POSTPOST
    await supertest(app).post('/api/postPost')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        console.log(response.body);
    });
});

// Posting a post with a JWT
test("Post post with JWT 2", async ()=>{
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

    // console.log(logininfo);
    const data = {
        'opportunityid' : '25949134-7fb4-4bbe-832f-ec63ae54fc03',
        'userid' : logininfo.userid,
        'content' : 'BLACK SHEEP WALL',
        'title': 'Removal of the fog of war',
        'createddate': new Date().toISOString(),
    }
    // console.log(data);

    // SET THE JWT COOKIE BEFORE CALLING POSTPOST
    await supertest(app).post('/api/postPost')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        // console.log(response.body);
    });
});

// Posting a post with a JWT
test("Post post with JWT 3", async ()=>{
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

    // console.log(logininfo);
    const data = {
        'opportunityid' : 'c6feb949-9ea4-4a65-9e36-8acc9fac151d',
        'userid' : logininfo.userid,
        'content' : 'OPERATION CWAL',
        'title': 'Extra fast unit production',
        'createddate': new Date().toISOString(),
    }
    // console.log(data);

    // SET THE JWT COOKIE BEFORE CALLING POSTPOST
    await supertest(app).post('/api/postPost')
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .send(data)
    .expect(201)
    .then((response) =>{
        // console.log(response.body);
    });
});


// Retrieval of posts for a specific opportunity
test("get posts", async() => {
    // GET A JWT FIRST
    const logininfo = await supertest(app).post('/api/login')
    .send(loginData)
    .expect(200)
    .then( (response) =>{
       return response.body;
    });

    const data = {
        'opportunityid' : 'c6feb949-9ea4-4a65-9e36-8acc9fac151d'
    }

    // Call an authenticated get Posts given opportunityid
    // console.log(data);
    
    await supertest(app).get(`/api/getPosts/${data.opportunityid}`)
    .set('Cookie', [`accessToken=${logininfo.accessToken}`])
    .expect(200)
    .then((response) =>{
        // console.log(response.body);
    })
});

// insert a comment into the comments table.
test("insert comment for post and get the comment", async() =>{
        // GET A JWT FIRST
        const logininfo = await supertest(app).post('/api/login')
        .send(loginData)
        .expect(200)
        .then( (response) =>{
           return response.body;
        });

        const data = {
            'opportunityid' : 'c6feb949-9ea4-4a65-9e36-8acc9fac151d',
            'userid' : logininfo.userid,
            'content' : 'This post should have a comment with it.',
            'title': 'Post with comment test',
            'createddate': new Date().toISOString(),
        }
    
        // SET THE JWT COOKIE BEFORE CALLING POSTPOST
        const postinfo = await supertest(app).post('/api/postPost')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send(data)
        .expect(201)
        .then((response) =>{
            // console.log(response.body);
            return response.body.postid;
        });

        const commentdata = {
            'postid' : postinfo,
            'userid' : logininfo.userid,
            'content' : `Hi, I'm a comment!`,
            'createddate': new Date().toISOString(),
        }
        
        // Creates a comment for the post that was just created.
        await supertest(app).post('/api/postComment')
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send(commentdata)
        .expect(201)
        .then((response) =>{
            // console.log(response.body);
            return response.body;
        });


        const getCommentData = {
            'postid' : postinfo,
        }
        await supertest(app).get(`/api/getComments/${getCommentData.postid}`)
        .set('Cookie', [`accessToken=${logininfo.accessToken}`])
        .send(getCommentData)
        .expect(200)
        .then((response) =>{
            // console.log(response.body);
        });
});



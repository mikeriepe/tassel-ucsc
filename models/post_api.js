const postModel = require('./post_model');
const commentModel = require('./comment_model');

/**
 * Creates a post and inserts it into the Post table.
 * @param {*} data This data parameter is a json object that requires the following: opportunityid, userid, content.
 * 
 * data = {
 *  opportunityid : "a valid opportunity id"
 *  userid : "a user id, hopefully active"
 *  content: "content to be displayed onto the post"
 *  title: "A meaningful title"
 * }
 * 
 */
exports.postPost = async (req, res) => {
    // res.status(201).send();
    // console.log(req.body);
    const postid = await postModel.insertPost(req.body);
    res.status(201).send(postid);
}

/**
 * Gets all posts for a specific opportunity id
 * req.body should contain an opportunity id
 * 
 * data = {
 *  opportunityid : "a valid opportunity id"
 * }
 * 
 */
exports.getPosts = async (req, res) =>{
    // console.log(req);
    const data = await postModel.getPosts(
        {
            'opportunityid': req.params.eventid,
        }
    );
    res.status(200).send(data);
}

/**
 * Deletes post entry of the given postid
 * @param {*} req
 * @param {*} res
 * req.body = { postid : 'a valid post id' }
 */
exports.deletePost = async (req, res) => {
    try {
        console.log(req.body);
        // console.log(comments);
        await postModel.deletePost(req.body);
        res.status(200).send();
    } catch (error) {
        console.log(`error deleting post ${error}`);
        res.status(500).send({message: 'error deleting post'});
    }
}


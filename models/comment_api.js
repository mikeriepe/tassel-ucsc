const commentModel = require('./comment_model');

/**
 * Creates a post and inserts it into the comment table.
 * @param {*} data This data parameter is a json object that requires the following: postid, userid, content.
 * 
 * data = {
 *  postid : "a valid post id"
 *  userid : "a user id, hopefully active"
 *  content: "content to be displayed onto the post"
 * }
 * 
 */
exports.postComment = async (req, res) => {
    // console.log(req.body);
    const commentid = await commentModel.insertComment(req.body);
    res.status(201).send({commentid});
}

/**
 * Get comment for a specific post id
 * @param {*} data 
 * 
 * data = {
 *      postid: "a valid post id"
 * } 
 */
exports.getComments = async(req,res) =>{
    const data = await commentModel.getComments({
        'postid' : req.params.postid,
    });
    res.status(200).send(data);
}

/**
 * DELETEs a comment object
 * @param {*} req
 * @param {*} res
 */
 exports.deleteComment = async (req, res) => {
    // console.log(req.params.eventid);
    try {
      const comment = await commentModel.deleteComment(req.params.commentid);
      res.status(200).json({message: 'comment deleted'});
    }
    catch (error) {
      // console.log(error);
      res.status(500).send('error deleting comment')
    }
    
  };

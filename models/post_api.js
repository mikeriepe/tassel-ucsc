const postModel = require('./post_model');
exports.postPost = async (req, res) => {
    console.log(req.params.data);
    const postid = await postModel.insertPost(req.params.data);
    res.status(201).send(postid);
}
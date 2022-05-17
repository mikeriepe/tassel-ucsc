const postModel = require('./post_model');

exports.postPost = async (req, res) => {
    // res.status(201).send();
    console.log(req.body);
    const postid = await postModel.insertPost(req.body);
    res.status(201).send(postid);
}

exports.getPost = async (req, res) =>{
    const data = await postModel.getPost(req.body);
    res.status(200).send(data);
}
const majorModel = require('./major_model');
const uuid = require('uuid');

/**
 * Get all the majors
 */
exports.getMajors = async (req, res) => {
    const majors = await majorModel.getAllMajors();
    res.status(200).send(majors);
}
 
/**
 * Post a major
 */
 exports.postMajor = async (req, res) => {
    const newUUID = uuid.v4();
    try {
      const majorid = await majorModel.postMajor(req.body, newUUID);
      res.status(201).send({majorid: majorid});
    }
    catch (error) {
      // console.log(error);
      res.status(500).send('error creating major')
    }
}

/**
 * DELETEs a major object
 * @param {*} req
 * @param {*} res
 */
 exports.deleteMajor = async (req, res) => {
    // console.log(req.params.eventid);
    try {
      const major = await majorModel.deleteMajor(req.params.majorid);
      res.status(200).json({message: 'major deleted'});
    }
    catch (error) {
      // console.log(error);
      res.status(500).send('error deleting major')
    }
    
  };

const majorModel = require('./major_model');

/**
 * Get all the majors
 */
exports.getMajors = async (req, res) => {
    const majors = await majorModel.getAllMajors();
    res.status(200).send(majors);
}

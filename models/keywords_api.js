const keywordsModel = require('./keywords_model');

/**
 * GETs all keywords from DB
 * retrieves keywords
 * @param {*} req
 * @param {*} res
 */
 exports.getKeywords = async (req, res) => {
  const keywords = await keywordsModel.getKeywords();
  res.status(201).send(keywords);
};
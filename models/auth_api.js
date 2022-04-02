const jwt = require('jsonwebtoken');
const secrets = require('./secrets.json');

/**
 *  check is used to verfiy if the JWT is valid.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.check = (req, res, next) => {
    // Code to verifiy JWTS
    // console.log(req.cookies.accessToken);   
    if (typeof req.cookies.accessToken !== 'undefined') {
        const authHeader = req.cookies.accessToken;
        // const token = authHeader.split(' ')[1];
        // console.log(token);
        // console.log(secrets.accessToken);
        jwt.verify(authHeader, secrets.accessToken, (err, user) => {
            // Role Check Here
            // Decode payload
            if (err) {
                // console.log(err);
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        console.log("JWT IS INVALID");
        res.sendStatus(401);
    }
};


exports.dummy = async (req, res) =>{
    console.log(req.cookies);
    res.sendStatus(200);
}

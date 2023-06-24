const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];
    if(!authToken) {
        return res.status(401).json({message: "Not authenticate"});
    }
    jwt.verify(authToken, process.env.SECRET_KEY, 
        (error, decode) => {
            if (error) {
                return res.status(403).json({message: "Not authenticate"});
            }
            req.user = decode;
            next();
        })
}

module.exports = authenticate;
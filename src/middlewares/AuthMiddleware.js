const JwtUtils = require('../utils/jwtUtils');

class AuthMiddleware {
 
  authenticateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    token = token.split(' ')[1]; 

    const jwt = new JwtUtils();
    const verified = jwt.verifyToken(token);

    if (!verified) {
        return res.status(401).send('Invalid Token');
    }
    req.user = verified;
    next();
  }
}

module.exports = new AuthMiddleware();
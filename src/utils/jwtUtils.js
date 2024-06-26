const jwt = require('jsonwebtoken');
// const secretKey = process.env.JWT_SECRET;

class JwtUtils {
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
  }
  generateToken(payload = {username: "test", password: "test"}) {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secretKey);
  }
}

module.exports = JwtUtils;

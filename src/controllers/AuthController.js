const JwtUtils = require('../utils/jwtUtils');

class AuthController {
  
  static async generateToken(req, res) {
    const { username, password } = req.body;
    // Simple validation (replace this with a database lookup)
    if (username || !username) {
      const jwt = new JwtUtils();
      const token = jwt.generateToken({ username, password });

      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }
}

module.exports = AuthController;

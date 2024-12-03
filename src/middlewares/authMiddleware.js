const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
  let token;

  // Check for Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    // Extract token
    token = authHeader.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default");
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization header missing or malformed.' });
  }
};

module.exports = verifytoken;

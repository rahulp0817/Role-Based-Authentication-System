const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startswith('Bearer ')) {
    token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied.' });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SERECT || "default");
      req.user = decode;
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }
}

module.exports = verifytoken;
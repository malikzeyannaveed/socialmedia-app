const  jwt = require('jsonwebtoken');
const secretkey = 'thisisasecretkey'

 const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('auth_token');

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token,secretkey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = verifyToken;
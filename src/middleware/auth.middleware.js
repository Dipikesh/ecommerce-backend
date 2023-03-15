const jwt = require(`jsonwebtoken`);
const path = require('path');
const fs = require('fs');
const pathToPubKey = path.join(__dirname,'..', 'utils/id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8') 
exports.authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  // Verify the token and extract the payload
  jwt.verify(token, PUB_KEY, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.user = payload.sub;
    next();
  });
};
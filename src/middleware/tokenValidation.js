const jwt = require('jsonwebtoken');

function generateJwtToken(userObj) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  const jwtSecret = process.env.JWT_TOKEN_SECRET;

  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    return false;
  }
}

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  if (!tokenGotFromUser) return ErrorCase(res, 'no token', 401);

  const verifyData = verifyJwtToken(tokenGotFromUser);
  if (verifyData === false) return ErrorCase(res, 'invalid token', 403);
  req.userId = verifyData.id;
  next();
}

module.exports = { generateJwtToken, verifyJwtToken, validateToken };

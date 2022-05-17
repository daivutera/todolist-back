const { SuccessCase, ErrorCase } = require('../helpers/helpers');
const bcrypt = require('bcryptjs');
const { userRegisterDb, userLoginDb } = require('../models/authModel');
const { generateJwtToken } = require('../middleware/tokenValidation');

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userLoginDb(email, password);
  if (user === false) {
    ErrorCase(res);
    return;
  }

  if (!user.length) {
    return ErrorCase(res, 'password or email does not match 1');
  }
  const checkPassword = bcrypt.compareSync(password, user[0].password);
  if (!checkPassword) {
    return ErrorCase(res, 'password, email or full name does not match 2');
  }

  const foundUserObj = user[0];

  const token = generateJwtToken(foundUserObj);
  SuccessCase(res, token);
}

async function registerUser(req, res) {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = await userRegisterDb(email, hashPassword);
  console.log('user', user);
  if (user.msg) {
    ErrorCase(res, user.msg, 400);
    return;
  }
  if (user === false) {
    ErrorCase(res);
    return;
  }
  if (!user.affectedRows) {
    return ErrorCase(res, 'password or email does not match 1');
  }

  SuccessCase(res, user);
}

module.exports = { loginUser, registerUser };

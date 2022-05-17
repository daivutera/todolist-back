const { string } = require('joi');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

async function validation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().min(4).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error, 'error from Joi validation');
    const foratedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
      success: false,
    }));
    res.status(400).json({ formatedError, success: false });
  }
}

module.exports = validation;

const Joi = require("joi");
const validation = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roleId: Joi.number().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error.details[0].message,
      error: true,
      status: 400,
    });
  }
  next();
};

module.exports = validation;

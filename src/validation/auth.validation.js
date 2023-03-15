const Joi = require(`@hapi/joi`)

module.exports = {
  registerUser: () => {
    return Joi.object({
      name: Joi.string()
        .required()
        .messages({
          'any.required': `name is Required!`,
          'string.base': `name should be type of 'text'`
        }),
      email: Joi.string()
        .email()
        .lowercase()
        .required()
        .messages({
          'string.email': `Invalid Email`,
          'any.required': `Email is required`
        }),
      password: Joi.string()
        .required()
        .messages({
          'any.required': `Password is Required!`
        }),
      confirmPassword: Joi.ref(`password`)
    })
  },
  loginUser: () => {
      return Joi.object({
        email: Joi.string()
        .email()
        .lowercase()
        .required()
        .messages({
          'string.email': `Invalid Email`,
          'any.required': `Email is required`
        }),
        password: Joi.string()
          .required()
          .messages({
            'any.required': `Password is Required!`
          })
    })
        
  },
  contact: () => {
    return Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      phone: Joi.string().optional(),
      message: Joi.string().optional()

    })
  }
}

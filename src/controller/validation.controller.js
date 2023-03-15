const userValidation = require('../validation/auth.validation')
exports.signupUser = async (req, res, next) => {
  const { error } = await userValidation.registerUser().validate(req.body)
  if (error) return next(error)
  else next()
}

exports.loginUser = async (req, res, next) => {
  const { error } = await userValidation.loginUser().validate(req.body)
  if (error) return next(error)
  else next()
}


exports.contact = async (req, res, next) => {
  const { error } = await userValidation.contact().validate(req.body)
  if (error) return next(error)
  else next()
}

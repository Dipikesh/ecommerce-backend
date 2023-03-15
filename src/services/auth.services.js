const createError = require('http-errors')
const { userSchema } = require('../model/user.model')
const hashing = require('../utils/generator')

//SignUp User ,first it query about whether this email id exist or not , then proceed
exports.signupUser = async body => {
  try {
    const { email, name, password } = body
    const result = await userSchema.findOne({ email, isVerified: true })
    if (result) {
      throw createError(400, 'Email Already Exists')
    }
    var { hash, salt } = await hashing.genHash(password)
    const user = new userSchema({ email, name, password: { hash, salt } })
    const doc = await userSchema.updateOne(
      { email },
      { email, name, password: { hash, salt } },
      { upsert: true }
    )
    if (doc.nModified || doc.upserted) {
      console.log('User Registered')
      return
    }
  } catch (err) {
    throw err
  }
}

exports.loginUser = async body => {
  try {
    const { email, password } = body
    const result = await userSchema.findOne({ email })
    if (!result) throw createError(400, 'Invalid Email')
   
    const { hash, salt } = result.password
    if (!(await hashing.validateHash(password, hash, salt)))
      throw createError(400, 'Invalid Credentials')

    return result
  } catch (err) {
    throw err
  }
}



exports.isUserExist = async email => {
  try {
    const user = await userSchema.findOne({ email }, { password: 0 })
    if (!user) throw createError(404, 'Email does not exist')
    if (user && !user.isVerified) {
      throw createError(400, 'Email is not verified, Please Verify it first')
    }
    return user
  } catch (err) {
    throw err
  }
}



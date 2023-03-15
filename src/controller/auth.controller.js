const authService = require('../services/auth.services')
const tokenServices = require('../services/token.services')
const contactService = require('../services/contact.service')

exports.signupUser = async (req, res, next) => {
  try {
    console.log('body', req.body)

    const result = await authService.signupUser(req.body)
    res.status(201).json({
      success: true,
      message: `User has registerd successfully`
    })
  } catch (err) {
    next(err)
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body)
    if (user) {
        const token = await tokenServices.signAccessToken(user._id);
      if (token) {
        res.cookie('authorization', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7, 
          httpOnly: true
        })
        res
          .status(200)
          .json({ id:user._id,message: 'You are now logged in',token })
      }
    }
  } catch (err) {
    next(err)
  }
}


exports.createContact = async (req, res, next) => {
  try {
    const { name, phone, message } = req.body;
    const userId = req.user;
    const data = {
      userId: userId,
      name: name || "",
      phone: phone || "",
      message: message || "",
    }
    const contact = await contactService.createContact(data);
    res.status(201).json({
      success: true,
      message: 'Contact has been created successfully',
    });

  }
  catch (err) {
    next(err)
  }
}


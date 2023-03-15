const {contactSchema} = require('../model/contact.model');
const createError = require('http-errors');
exports.createContact = async (data) => {
        try {
                console.log("data", data);
                const contact = new contactSchema({ data });
                return await contact.save();
       
        } catch (err) {
                console.log(err)
        throw createError(400,"Error in saving contact data")
        }
}
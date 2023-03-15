const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
  },
  email: {
    type: mongoose.Schema.Types.String,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.String,
  },
  message: {
    type: mongoose.Schema.Types.String,
  },
});

exports.contactSchema = mongoose.model("contact", schema);

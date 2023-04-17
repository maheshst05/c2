const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String

   // enum: ['Super Admin', 'Admin', 'custmer','saller'],

  }
});

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}

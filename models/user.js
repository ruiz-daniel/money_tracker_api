const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  email: String,
  admin: { type: Boolean, default: false },
  profile_picture: String,
  password: { type: String, required: true, virtual: true },
  disabled: { type: Boolean, default: false },
  accounts: [{ type: Schema.Types.ObjectId, ref: 'account' }]
})

userSchema.methods.toJSON = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('user', userSchema)
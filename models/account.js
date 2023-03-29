const mongoose = require('mongoose')
const { Schema } = mongoose

const accountSchema = new Schema({
  name: { type: String, required: true, unique: true },
  balance: Number,
  transactions: [{ type: Schema.Types.ObjectId, ref: 'transaction' }]
})

module.exports = mongoose.model('account', accountSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  description: { type: String, default: "New Transaction" },
  amount: {type: Number, required: true},
  type: { type: String, required: true },
  labels: [String],
  date: { type: Date, default: Date() }
})

module.exports = mongoose.model('transaction', transactionSchema)
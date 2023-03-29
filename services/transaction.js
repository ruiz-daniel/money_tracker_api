const mongoose = require('mongoose')
const transactionModel = require('../models/transaction')

/**
 * @param {Object} transaction
 * @throws {Error}
 */
module.exports.handler = {
  async create(transaction) {
    const result = await transactionModel.create(transaction).catch((error) => {
      throw new Error(error.message)
    })
    return result
  },
  async getById(id) {
    const result = await transactionModel.findById(id).catch((error) => {
      throw new Error('Transaction not found')
    })
    return result
  },
  async update(transaction) {
    let result = await transactionModel
      .findByIdAndUpdate(transaction._id, transaction, { new: true })
      .catch((error) => {
        throw new Error(error.message)
      })
    if (!result?._id) {
      throw new Error('Transaction not found')
    }
    return result
  },
  async delete(id) {
    let result = await transactionModel
      .deleteOne({ _id: id })
      .catch((error) => {
        throw new Error('Transaction not found')
      })
    return result
  },
}

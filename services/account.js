const mongoose = require('mongoose')
const accountModel = require('../models/account')

/**
 * @param {Object} account
 * @throws {Error}
 */
module.exports.handler = {
  async create(account) {
    const result = await accountModel.create(account).catch((error) => {
      throw new Error(error.message)
    })
    return result
  },
  async update(account) {
    let result = await accountModel
      .findByIdAndUpdate(account._id, account, { new: true })
      .catch((error) => {
        if (error.keyValue?.name) {
          throw new Error('Account name already exists')
        }
      })
    if (!result?._id) {
      throw new Error('Account not found')
    }
    return result
  },
  async delete(id) {
    let result = await accountModel.deleteOne({ _id: id }).catch((error) => {
      throw new Error('Account not found')
    })
    return result
  },
}

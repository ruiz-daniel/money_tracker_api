const mongoose = require('mongoose')
const accountModel = require('../models/account')
const transactionService = require('./transaction')

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
  async getById(id) {
    const result = await accountModel
      .findById(id)
      .populate('transactions')
      .catch((error) => {
        throw new Error('Account not found')
      })
    return result
  },
  async update(account) {
    let result = await accountModel
      .findByIdAndUpdate(account._id, account, { new: true })
      .populate('transactions')
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
  async addTransaction(accountId, transaction) {
    let result
    let account = await this.getById(accountId).catch((error) => {
      throw new Error(error)
    })
    transaction = await transactionService.handler
      .create(transaction)
      .catch((error) => {
        throw new Error(error)
      })
    if (transaction._id) {
      account.transactions.push(transaction._id)
      addTransactionAmount(account, transaction)
      result = await this.update(account)
    }
    return result
  },
  async changeTransaction(accountId, transaction) {
    let result
    let account = await this.getById(accountId).catch((error) => {
      throw new Error(error)
    })
    let oldTransaction = await transactionService.handler
      .getById(transaction._id)
      .catch((error) => {
        throw new Error(error)
      })
    if (oldTransaction._id) {
      removeTransactionAmount(account, oldTransaction)
    }
    await transactionService.handler.update(transaction).catch((error) => {
      throw new Error(error)
    })
    addTransactionAmount(account, transaction)
    result = await this.update(account)

    return result
  },
  async deleteTransaction(accountId, transactionId) {
    let result
    let account = await this.getById(accountId).catch((error) => {
      throw new Error(error)
    })
    let transaction = await transactionService.handler
      .getById(transactionId)
      .catch((error) => {
        throw new Error(error)
      })
    if (transaction._id) {
      removeTransactionAmount(account, transaction)
      await transactionService.handler.delete(transactionId).catch((error) => {
        throw new Error(error)
      })
      result = await this.update(account)
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

const addTransactionAmount = function (account, transaction) {
  transaction.type === 'increase'
    ? (account.balance += transaction.amount)
    : (account.balance -= transaction.amount)
}
const removeTransactionAmount = function (account, transaction) {
  transaction.type === 'increase'
    ? (account.balance -= transaction.amount)
    : (account.balance += transaction.amount)
}

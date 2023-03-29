const mongoose = require('mongoose')
const userModel = require('../models/user')
const accountService = require('./account')

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 * @param {Object} user
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await userModel
      .find({}, { password: 0 })
      .populate({
        path: 'accounts',
        populate: {
          path: 'transactions'
        }
      })
    return result
  },
  async getById(userid) {
    const result = await userModel
      .findById(userid)
      .populate({
        path: 'accounts',
        populate: {
          path: 'transactions'
        }
      })
      .catch((error) => {
        throw new Error('User not found')
      })
    return result
  },
  async login(username, password) {
    let result = await userModel
      .findOne(
        {
          username: username,
          password: getHashedPassword(password),
        },
        { password: 0 },
      )
      .populate({
        path: 'accounts',
        populate: {
          path: 'transactions'
        }
      })
      .catch((error) => {
        throw new Error('Invalid username or password')
      })

    const token = generateAccessToken(result._doc)
    result._doc.access_token = token

    return result
  },
  async register(user) {
    if (user?.password) {
      user.password = getHashedPassword(user.password)
    }

    let result = await userModel.create(user).catch((error) => {
      if (error.keyValue?.username) {
        throw new Error('Username already exists')
      }
    })

    if (result?._id) {
      result = result.toJSON()
    }

    return result
  },
  async update(user) {
    let result = await userModel
      .findByIdAndUpdate(user._id, user, { new: true })
      .populate({
        path: 'accounts',
        populate: {
          path: 'transactions'
        }
      })
      .catch((error) => {
        if (error.keyValue?.username) {
          throw new Error('Username already exists')
        }
      })
    if (!result?._id) {
      throw new Error('User not found')
    }
    return result
  },
  async addUserAccount(userid, account) {
    let result
    let user = await this.getById(userid).catch((error) => {
      throw new Error(error)
    })
    account = await accountService.handler.create(account).catch((error) => {
      throw new Error(error)
    })
    if (account._id) {
      user.accounts.push(account._id)
      result = await this.update(user)
    }
    return result
  },
  async delete(id) {
    let result = await userModel.deleteOne({ _id: id }).catch((error) => {
      throw new Error('User not found')
    })
    return result
  },
}

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update(password).digest('base64')
  return hash
}

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' })
}

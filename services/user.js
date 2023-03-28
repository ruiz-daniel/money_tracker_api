const mongoose = require('mongoose')
const userModel = require('../models/user')

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/**
 * @param {Object} user
 * @throws {Error}
 */
module.exports.handler = {
  async get() {
    const result = await userModel.find({}, { password: 0 })
    return result
  },
  async getById(userid) {
    const result = await userModel.findById(userid).catch((error) => {
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
      .findByIdAndUpdate(user, user, { new: true })
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

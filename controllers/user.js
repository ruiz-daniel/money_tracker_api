const userService = require('../services/user')

exports.getUsers = async (req, res, next) => {
  const response = await userService.handler.get()
  res.send(response)
}

exports.getUser = async (req, res, next) => {
  const response = await userService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.register = async (req, res, next) => {
  const response = await userService.handler
    .register(req.body)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.login = async (req, res, next) => {
  const response = await userService.handler
    .login(req.body.username, req.body.password)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.update = async (req, res, next) => {
  const response = await userService.handler.update(req.body).catch((error) => {
    res.status(400)
    return error.message
  })
  res.send(response)
}

exports.addAccount = async (req, res, next) => {
  const response = await userService.handler.addUserAccount(req.params.id, req.body).catch((error) => {
    res.status(400)
    return error.message
  })
  res.send(response)
}

exports.delete = async (req, res, next) => {
  const response = await userService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

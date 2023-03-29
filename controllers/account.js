const accountService = require('../services/account')

exports.getAccount = async (req, res, next) => {
  const response = await accountService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.update = async (req, res, next) => {
  const response = await accountService.handler.update(req.body).catch((error) => {
    res.status(400)
    return error.message
  })
  res.send(response)
}

exports.addTransaction = async (req, res, next) => {
  const response = await accountService.handler.addTransaction(req.params.id, req.body).catch((error) => {
    res.status(400)
    return error.message
  })
  res.send(response)
}

exports.delete = async (req, res, next) => {
  const response = await accountService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

const transactionService = require('../services/transaction')

exports.getTransaction = async (req, res, next) => {
  const response = await transactionService.handler
    .getById(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

exports.update = async (req, res, next) => {
  const response = await transactionService.handler.update(req.body).catch((error) => {
    res.status(400)
    return error.message
  })
  res.send(response)
}

exports.delete = async (req, res, next) => {
  const response = await transactionService.handler
    .delete(req.params.id)
    .catch((error) => {
      res.status(400)
      return error.message
    })
  res.send(response)
}

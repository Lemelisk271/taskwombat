const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Payment } = require('../../db/models')

router.get('/', requireAuth, async (req, res) => {
  const payment = await Payment.findAll({
    where: {
      userId: req.user.id
    }
  })

  res.json(payment)
})

router.put('/:paymentId', requireAuth, async (req, res, next) => {
  const payment = await Payment.findByPk(req.params.paymentId)

  if (!payment) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Payment Not Found"
    err.errors = {message: "The requested payment couldn't be found"}
    return next(err)
  }

  payment.set(req.body)

  await payment.save()

  res.status(201).json(payment)
})

router.delete('/:paymentId', requireAuth, async (req, res, next) => {
  const payment = await Payment.findByPk(req.params.paymentId)

  if (!payment) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Payment Not Found"
    err.errors = {message: "The requested payment couldn't be found."}
    return next(err)
  }

  if (payment.userId !== req.user.id) {
    const err = new Error('Invalid Authorization')
    err.status = 403
    err.title = ('Invalid Authorization')
    err.errors = {message: "You can only delete your own payments"}
    return next(err)
  }

  payment.destroy()

  res.json({message: 'Successfully Deleted'})
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const newPayment = Payment.build(req.body)
    newPayment.validate()
    await newPayment.save()
    res.status(201).json(newPayment)
  } catch (err) {
    return next(err)
  }
})

module.exports = router

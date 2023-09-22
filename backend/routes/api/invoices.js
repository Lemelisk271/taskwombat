const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { Invoice, Appointment } = require('../../db/models')

router.get('/', requireAuth, async (req, res) => {
  const invoices = await Invoice.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Appointment
      }
    ],
    order: [
      [{model: Appointment}, "start", 'ASC']
    ]
  })

  res.json(invoices)
})

router.put('/:invoiceId', requireAuth, async (req, res, next) => {
  const invoice = await Invoice.findByPk(req.params.invoiceId)

  if (!invoice) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Invoice Not Found"
    err.errors = {message: "The requested payment couldn't be found"}
    return next(err)
  }

  if (invoice.userId !== req.user.id) {
    const err = new Error('Invalid Authorization')
    err.status = 403
    err.title = 'Invalid Authorization'
    err.errors = {message: 'You can only update your own invoices'}
    return next(err)
  }

  invoice.set(req.body)

  await invoice.save()

  res.status(201).json(invoice)
})

module.exports = router

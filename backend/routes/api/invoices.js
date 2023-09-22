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

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const newInvoice = Invoice.build(req.body)
    newInvoice.validate()
    await newInvoice.save()
    res.status(201).json(newInvoice)
  } catch (err) {
    return next(err)
  }
})

router.put('/appointment/:apptId', requireAuth, async (req, res, next) => {
  const invoice = await Invoice.findOne({
    where: {
      appointmentId: req.params.apptId
    }
  })

  if (!invoice) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Invoice Not Found"
    err.errors = {message: "The requested invoice couldn't be found"}
    return next(err)
  }

  const rate = invoice.rate
  const fees = invoice.fees
  const hours = req.body.hours

  const total = parseFloat((parseFloat(rate) * parseInt(hours)) + parseFloat(fees)).toFixed(2)

  const invoiceObj = {
    hours: hours,
    totalDue: total
  }

  invoice.set(invoiceObj)

  invoice.save()

  res.json(invoice)
})

module.exports = router

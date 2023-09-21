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

module.exports = router

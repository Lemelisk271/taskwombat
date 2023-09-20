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

module.exports = router

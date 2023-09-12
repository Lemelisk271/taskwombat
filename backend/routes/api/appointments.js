const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')

const { Appointment } = require('../../db/models')

router.put('/:apptId', requireAuth, async (req, res, next) => {
  try {
    const appointment = await Appointment.findByPk(req.params.apptId)

    if (!appointment) {
      const err = new Error("Not Found")
      err.status = 404
      err.title = "Task Not Found"
      err.errors = {Message: "The requested review couldn't be found"}
      return next (err)
    }

    appointment.set(req.body)

    await appointment.save()

    res.json(appointment)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router

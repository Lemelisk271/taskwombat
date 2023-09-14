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

router.delete('/:apptId', requireAuth, async (req, res, next) => {
  const appointment = await Appointment.findByPk(req.params.apptId)

  if (!appointment) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Task Not Found"
    err.errors = {message: "The Requested appointment couldn't be found"}
    return next(err)
  }

  if (appointment.userId != req.user.id) {
    const err = new Error('Invalid Authorization')
    err.status = 403
    err.title = 'Invalid Authorization'
    err.errors = {message: "You can only delete your own appointments"}
    return next(err)
  }

  appointment.destroy()

  res.json({message: "Successfully Deleted"})
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const newAppointment = Appointment.build(req.body)
    newAppointment.validate()
    await newAppointment.save()
    res.status(201).json(newAppointment)
  } catch (err) {
    return next(err)
  }
})

module.exports = router

const express = require('express')
const router = express.Router()

const { Tasker, Availability, Review, Appointment } = require('../../db/models')

router.get('/:taskerId', async (req, res) => {
  const tasker = await Tasker.findByPk(req.params.taskerId, {
    include: [
      {
        model: Review
      },
      {
        model: Appointment
      }
    ]
  })

  if (!tasker) {
    return res.status(404).json({message: "The requested Tasker Couldn't be Found"})
  }

  res.json(tasker)
})

router.get('/schedule/:taskerId', async (req, res) => {
  const tasker = await Tasker.findByPk(req.params.taskerId, {
    include: [
      {
        model: Availability
      }
    ]
  })

  if (!tasker) {
    return res.status(404).json({message: "The Requested Tasker Couldn't be found"})
  }

  res.json(tasker)
})

module.exports = router

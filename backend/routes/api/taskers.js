const express = require('express')
const router = express.Router()

const { Tasker, Availability, Review, Appointment, Category } = require('../../db/models')

router.get('/:taskerId', async (req, res) => {
  const tasker = await Tasker.findByPk(req.params.taskerId, {
    include: [
      {
        model: Review
      },
      {
        model: Appointment
      },
      {
        model: Category,
        through: {
          attributes: ['rate']
        }
      },
      {
        model: Availability
      }
    ],
    order: [
      ['id', 'ASC'],
      [{model: Availability}, 'dayIdx', 'ASC']
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

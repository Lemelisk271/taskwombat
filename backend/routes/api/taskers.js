const express = require('express')
const router = express.Router()

const { Tasker, Availability, Review, Appointment, Category, Vehicle, Tool, User } = require('../../db/models')

router.get('/:taskerId', async (req, res) => {
  const tasker = await Tasker.findByPk(req.params.taskerId, {
    include: [
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'profileImage']
          }
        ]
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
      },
      {
        model: Vehicle,
        through: {
          attributes: []
        },
        attributes: ['vehicleType']
      },
      {
        model: Tool,
        through: {
          attributes: []
        }
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

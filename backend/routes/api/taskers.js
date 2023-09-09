const express = require('express')
const router = express.Router()

const { Tasker, Category, Review, Vehicle, Tool, Availability } = require('../../db/models')

router.get('/', async (req, res) => {
  const taskers = await Tasker.findAll({
    include: [
      {
        model: Category,
        through: {
          attributes: ['rate']
        }
      },
      {
        model: Review
      },
      {
        model: Vehicle,
        through: {
          attributes: []
        }
      },
      {
        model: Tool,
        through: {
          attributes: []
        }
      },
      {
        model: Availability
      }
    ],
    order: [
      ['id', 'ASC'],
      [{model: Category}, 'category', 'ASC'],
      [{model: Review}, 'date', 'DESC'],
      [{model: Availability}, 'dayIdx', 'ASC']
    ]
  })

  res.status(200).json(taskers)
})

module.exports = router

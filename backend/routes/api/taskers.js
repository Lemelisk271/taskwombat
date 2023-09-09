const express = require('express')
const router = express.Router()

const { Tasker, Category, Review, Vehicle } = require('../../db/models')

router.get('/', async (req, res) => {
  const taskers = await Tasker.findAll({
    include: [
      {
        model: Category,
        through: {
          attributes: []
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
      }
    ],
    order: [
      ['id', 'ASC'],
      [{model: Category}, 'category', 'ASC'],
      [{model: Review}, 'date', 'DESC']
    ]
  })

  res.status(200).json(taskers)
})

module.exports = router

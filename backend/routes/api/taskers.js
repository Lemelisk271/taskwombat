const express = require('express')
const router = express.Router()

const { Tasker, Category } = require('../../db/models')

router.get('/', async (req, res) => {
  const taskers = await Tasker.findAll({
    include: [
      {
        model: Category,
        through: {
          attributes: []
        }
      }
    ],
    order: [
      ['id', 'ASC'],
      [{model: Category}, 'category', 'ASC']
    ]
  })

  res.status(200).json(taskers)
})

module.exports = router
const express = require('express')
const router = express.Router()

const { Category, Subcategory } = require('../../db/models')

router.get('/', async (_req, res) => {
  const categories = await Category.findAll({
    include: [
      {
        model: Subcategory,
        through: {
          attributes: []
        }
      }
    ],
    order: [
      ['id', 'ASC'],
      [{model: Subcategory}, 'subcategory', 'ASC']
    ]
  })

  res.status(200).json(categories)
})

module.exports = router

const express = require('express')
const router = express.Router()

const { Category, Subcategory, Tasker } = require('../../db/models')

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

router.get('/:categoryId', async (req, res) => {
  const category = await Category.findByPk(req.params.categoryId, {
    include: [
      {
        model: Subcategory,
        through: {
          attributes: []
        }
      },
      {
        model: Tasker
      }
    ]
  })

  res.status(200).json(category)
})

module.exports = router

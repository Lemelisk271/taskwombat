const express = require('express')
const router = express.Router()

const { Category, Subcategory, Tasker, Review, Appointment } = require('../../db/models')

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
        model: Tasker,
        through: {
          attributes: ['rate']
        },
        include: [
          {
            model: Review,
            where: {
              categoryId: req.params.categoryId
            }
          },
          {
            model: Appointment,
            where: {
              categoryId: req.params.categoryId
            }
          }
        ]
      }
    ]
  })

  res.status(200).json(category)
})

module.exports = router

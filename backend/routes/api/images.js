const express = require('express')
const router = express.Router()

const { ReviewImages } = require('../../db/models')

router.get('/', async (req, res) => {
  const images = await ReviewImages.findAll()

  res.json(images)
})

module.exports = router

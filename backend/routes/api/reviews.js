const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth.js')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation.js')

const { Review } = require('../../db/models')

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .notEmpty()
    .withMessage("Please enter a review"),
  check('stars')
    .exists({checkFalsy: true})
    .isInt({
      min: 1,
      max: 5
    })
    .withMessage("Review Stars must Be Between 1 and 5"),
  handleValidationErrors
]

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)

  if (!review) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Review Not Found"
    err.errors = {message: "The requested review couldn't be found"}
    return next(err)
  }

  review.set(req.body)

  await review.save()

  res.json(review)
})

module.exports = router

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

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)

  if (!review) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Review Not Found"
    err.errors = {message: "The requested review couldn't be found"}
    return next(err)
  }

  if (review.userId != req.user.id) {
    const err = new Error('Invalid Authorization')
    err.status = 403
    err.title = ('Invalid Authorization')
    err.errors = {message: "You can only delete your own reviews"}
    return next(err)
  }

  review.destroy()

  res.json({message: 'Successfully Deleted'})
})

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const newReview = Review.build(req.body)
    newReview.validate()
    await newReview.save()
    res.status(201).json(newReview)
  } catch (err) {
    return next(err)
  }
})

module.exports = router

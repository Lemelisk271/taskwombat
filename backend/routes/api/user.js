const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie } = require('../../utils/auth.js')
const { User, Review } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation.js')

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 100})
    .withMessage('Please provide a valid first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 100})
    .withMessage('Please provide a valid last name'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check('zipCode')
    .exists({ checkFalsy: true})
    .isInt()
    .withMessage("Please enter a zip code."),
  check('profileImage')
    .optional()
    .isURL()
    .withMessage("Please enter a valid URL for the image"),
  handleValidationErrors
]

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Review
      }
    ]
  })

  res.status(200).json(users)
})

router.post('/', validateSignup, async (req, res) => {
  const { email, password, firstName, lastName, zipCode, profileImage = null, phone } = req.body
  const hashedPassword = bcrypt.hashSync(password)
  const user = await User.create({
    firstName,
    lastName,
    email,
    hashedPassword,
    zipCode,
    profileImage,
    phone
  })

  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    zipCode: user.zipCode,
    profileImage: user.profileImage,
    phone: user.phone
  }

  await setTokenCookie(res, safeUser)

  return res.json({ user: safeUser })
})

module.exports = router

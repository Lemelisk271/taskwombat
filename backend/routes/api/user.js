const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { User, Review, Tasker, Category, ReviewImages, Appointment } = require('../../db/models')
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

router.get('/:userId', async (req, res) => {
  const id = parseInt(req.params.userId)
  let user = await User.findByPk(id, {
    include: [
      {
        model: Review,
        include: [
          {
            model: Tasker
          },
          {
            model: Category
          },
          {
            model: ReviewImages
          }
        ]
      },
      {
        model: Appointment,
        include: [
          {
            model: Tasker
          },
          {
            model: Category
          },
          {
            model: Review,
            include: [
              {
                model: Tasker
              },
              {
                model: Category
              },
              {
                model: ReviewImages
              }
            ]
          }
        ]
      }
    ],
    order: [
      [{model: Review}, 'date', 'DESC']
    ]
  })

  if (!user) {
    return res.status(404).json({message: "User couldn't be found"})
  } else {
    return res.json(user)
  }
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

router.put('/:userId', requireAuth, async (req, res, next) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "User Not Found"
    err.errors = {message: "The requested user couldn't be found"}
    return next(err)
  }

  user.set(req.body)

  await user.save()

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

  return res.status(201).json({ user: safeUser})
})

module.exports = router

const router = require('express').Router()
const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js')
const userRouter = require('./user.js')
const categoryRouter = require('./categories.js')
const taskerRouter = require('./taskers.js')
const reviewRouter = require('./reviews.js')
const imageRouter = require('./images.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/taskers', taskerRouter)
router.use('/reviews', reviewRouter)
router.use('/images', imageRouter)

module.exports = router

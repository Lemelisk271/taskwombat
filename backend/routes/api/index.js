const router = require('express').Router()
const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js')
const userRouter = require('./user.js')
const categoryRouter = require('./categories.js')
const taskerRouter = require('./taskers.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/taskers', taskerRouter)

module.exports = router

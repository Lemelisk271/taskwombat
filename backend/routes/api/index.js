const router = require('express').Router()
const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js')
const userRouter = require('./user.js')
const categoryRouter = require('./categories.js')

router.use(restoreUser)

router.use('/session', sessionRouter)
router.use('/users', userRouter)
router.use('/categories', categoryRouter)

module.exports = router

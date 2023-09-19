const express = require('express')
const router = express.Router()
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { singleMulterUpload, singlePublicFileUpload, removeFileFromS3 } = require('../../awsS3.js')
const { User } = require('../../db/models')


router.put("/:userId", requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const user = await User.findByPk(req.params.userId)

  if (!user) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "User Not Found"
    err.errors = {message: "The requested user couldn't be found"}
    return next(err)
  }

  if (user.profileImage.split(".")[0] === 'https://taskwombat') {
    console.log("**********")
    removeFileFromS3(user.profileImage)
    console.log("**********")
  }

  const profileImage = await singlePublicFileUpload(req.file)

  user.set({
    profileImage
  })
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

  return res.status(201).json({ user: safeUser })
})

module.exports = router

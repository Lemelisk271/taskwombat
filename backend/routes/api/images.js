const express = require('express')
const router = express.Router()
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { singleMulterUpload, singlePublicFileUpload, removeFileFromS3 } = require('../../awsS3.js')
const { User, ReviewImages } = require('../../db/models')


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
    removeFileFromS3(user.profileImage)
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

router.post("/review", requireAuth, singleMulterUpload("image"), async (req, res, next) => {
  const { reviewId, userId } = req.body
  const url = await singlePublicFileUpload(req.file)
  try {
    const newReviewImage = ReviewImages.build({
      url,
      reviewId,
      userId
    })
    newReviewImage.validate()
    await newReviewImage.save()
    res.status(201).json(newReviewImage)
  } catch(err) {
    return next(err)
  }
})

router.delete("/:imageId", async (req, res, next) => {
  const image = await ReviewImages.findByPk(req.params.imageId)

  if (!image) {
    const err = new Error("Not Found")
    err.status = 404
    err.title = "Image Not Found"
    err.errors = {message: "The requested image couldn't be found"}
    return next(err)
  }

  if (image.userId !== req.user.id) {
    const err = new Error("Invalid Authorization")
    err.status = 403
    err.title = "Invalid Authorization"
    err.errors = {message: "You can only delete your own images"}
    return next(err)
  }

  if (image.url.split(".")[0] === 'https://taskwombat') {
    removeFileFromS3(image.url)
  }

  image.destroy()

  res.json({message: 'Successfully Deleted'})
})

module.exports = router

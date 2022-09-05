const express = require('express')
const { Post, Profile } = require('../models')

const router = express.Router()

router
  .route('/feed')
  /**
     * This function get Posts for feed
     * @group Feed- api
     * @route GET /feed
     * @returns {Array.<Post>} 200 - An array of Posts
     * @returns {Error} Default - Unexpected error
     * @security JWT
     */
  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.findById(req.user.profile.id))
    .then(profile => Post
      .find({ profile: { $in: [...profile.following, req.user.profile] } })
      .populate('profile')
      .limit(10)
      .skip((req.query.page || 0) * 10)
      .sort({ createdAt: 'desc' })
    )
    .then((data) => res.status(200).json(data))
    .catch(err => next(err))
  )

module.exports = router

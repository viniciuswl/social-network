const express = require('express')
const { Profile } = require('../models')
const createError = require('http-errors')
const router = express.Router()

router
  .route('/profiles')
  /**
     * This function list all the Profiles
     * @group Profile - api
     * @route GET /profiles
     * @returns {Profile} 200 - Array of Profile's info
     * @returns {Error} Default - Unexpected error
     * @security JWT
     */
  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.find({ active: true }))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  )

router
  .route('/profiles/search')
  /**
     * This function search a profile by ID
     * @group Profile - api
     * @route GET /profiles/search?q={q}
     * @param {string} q.query.required - Search Profile Name
     * @returns {<Profile>} 200 - Array of Profiles
     * @security JWT
     */
  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.find({ $text: { $search: `${req.query.q}` } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }))
    .then(data => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err))
  )

router
  .route('/profiles/:id')
  /**
     * This function gets the profile by ID
     * @group Profile - api
     * @route GET /profiles/{id}
     * @param {string} id.path.required - Profile ID
     * @returns {<Profile>} 200 - Array of Profile's info
     * @security JWT
     */
  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.findById(req.params.id))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  )

router
  .route('/profiles/:id/follow')
  /**
     * This function follows profiles by ID
     * @group Profile - api
     * @route POST /profiles/{id}/follow
     * @param {string} id.path.required - Profile's ID
     * @security JWT
     */
  .post((req, res, next) => Promise.resolve()
    .then(() => Profile.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user.profile.id } }))
    .then(profile => req.publish('following', [profile.id], req.user.profile))
    .then(() => Profile.findByIdAndUpdate(req.user.profile, { $addToSet: { following: req.params.id } }))
    .then(() => res.status(200).send({ message: 'Profile followed' }))
    .catch(err => next(err))
  )

router
  .route('/profiles/:id/unfollow')
  /**
     * This function unfollows profiles by ID
     * @group Profile - api
     * @route POST /profiles/{id}/unfollow
     * @param {string} id.path.required - Profile's ID
     * @security JWT
     */
  .post((req, res, next) => Promise.resolve()
    .then(() => Profile.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.profile.id } }))
    .then(profile => req.publish('unfollowing', [profile.id], req.user.profile))
    .then(() => Profile.findByIdAndUpdate(req.user.profile, { $pull: { following: req.params.id } }))
    .then(() => res.status(200).send({ message: 'Unfollowed profile' }))
    .catch(err => next(err))
  )

module.exports = router

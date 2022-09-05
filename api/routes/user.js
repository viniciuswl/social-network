const express = require('express')
const { User, Profile } = require('../models')
const bcrypt = require('bcryptjs')

const router = express.Router()

router
  .route('/users/me')
  /**
    * This function gets my User
    * @group User - api
    * @route GET /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
  .get((req, res, next) => Promise.resolve()
    .then(() => User.findById(req.user.id))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  )
  /**
    * This function updates my User
    * @group User - api
    * @route PUT /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
  .put((req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((data) => User.findByIdAndUpdate(req.user.id, { ...req.body, password: data }))
    .then(() => Profile.findByIdAndUpdate(req.user.profile.id, { name: req.body.name }))
    .then(() => res.status(200).send({ message: 'User successfully updated' }))
    .catch(err => next(err))
  )
  /**
    * This function deletes my Users
    * @group User - api
    * @route DELETE /users/me
    * @returns {User} 200 - My User
    * @returns {Error} Default - Unexpected error
    * @security JWT
    */
  .delete((req, res, next) => Promise.resolve()
    .then(() => User.findByIdAndDelete(req.user.id))
    .then(user => Profile.findOneAndUpdate({ user }, { active: false, name: 'GenericUser' }))
    .then(() => res.status(200).send({ message: 'User deleted' }))
    .catch(err => next(err))
  )

module.exports = router

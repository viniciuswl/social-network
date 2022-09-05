const express = require('express')
const { User, Profile } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'randomtoken'

const router = express.Router()

router
  .route('/security/register')
  /**
    * This function creates a User
    * @group Security - api
    * @route POST /security/register
    */
  .post((req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then(passwordHashed => new User({ ...req.body, password: passwordHashed }).save())
    .then(user => new Profile({ name: user.user, user: user.id }).save()
      .then(profile => user.updateOne({ profile }))
    )
    .then(() => res.status(201).send({ message: 'Created user' }))
    .catch(err => next(err))
  )

router
  .route('/security/login')
  /**
     * This function makes Login
     * @group Security - api
     * @route POST /security/login
     */
  .post((req, res, next) => Promise.resolve()
    .then(() => User.findOne({ user: req.body.user }))
    .then(data => {
      data
        ? bcrypt.compare(req.body.password, data.password)
          .then(passwordHash => passwordHash
            ? res.status(201).json(jwt.sign(JSON.stringify({ user: data.user, profile: data.profile }), ACCESS_TOKEN_SECRET))
            : next(createError(401)))
        : next(createError(401))
    })
    .catch(err => next(err))
  )

module.exports = router

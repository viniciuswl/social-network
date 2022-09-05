const express = require('express')
const logger = require('morgan')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const esg = require('express-swagger-generator')
const cors = require('cors')
const helmet = require('helmet')

const notificationPub = require('./lib/pubsub')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'randomtoken'

const { Connection, User } = require('./models')
const postsRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const userRoute = require('./routes/user')
const profileRoute = require('./routes/profile')
const feedRoute = require('./routes/feed')
const securityRoute = require('./routes/security')

const defaultOptions = require('./swagger.json')
const options = Object.assign(defaultOptions, { basedir: __dirname })

const app = express()
const expressSwagger = esg(app)
expressSwagger(options)

app.use(cors())
app.use(helmet())
app.use(logger('dev'))
const urlencoded = bodyParser.urlencoded({ extended: true })
app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencoded(req, res, next))

app.use(bodyParser.json())

app.use((req, res, next) => Connection
  .then(() => next())
  .catch(err => next(err))
)

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
  if (token == null) return next(createError(401))
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(createError(403))
    User.findOne({ user: user.user }).populate('profile')
      .then(u => {
        req.user = u
        next()
      })
      .catch(err => next(err))
  })
}

app.use(notificationPub.pub)

app.get('/seed', (req, res, next) => require('./seed')
  .then(() => res.status(200).send({ message: 'Mongo is seeded' }))
  .catch(err => next(err))
)
app.use('/', securityRoute)
app.use('/', authenticateToken, postsRoute)
app.use('/', authenticateToken, commentRoute)
app.use('/', authenticateToken, userRoute)
app.use('/', authenticateToken, profileRoute)
app.use('/', authenticateToken, feedRoute)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message })
  } else if ((err.status === 404) || (err.name === 'CastError')) {
    res.status(404).send({ message: err.message })
  } else if (err.status === 401) {
    res.status(401).send({ message: err.message })
  } else {
    res.status(err.status || 500).send({ message: err.message })
  }
  console.log(err)
})

module.exports = app

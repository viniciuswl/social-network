const http = require('http')
const socketio = require('socket.io')
const jwt = require('jsonwebtoken')
const { User: UserModel } = require('./models')

const pubsub = require('./lib/pubsub')
const app = require('./app')

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'randomtoken'

const server = http.Server(app)
const io = socketio(server, {
  // Specifying CORS
  cors: {
    origin: '*'
  }
})

const liveData = io.of('/')

liveData.use((socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token) {
    jwt.verify(socket.handshake.auth.token, ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) return next(new Error('Authentication error'))
      UserModel.findOne({
        user: user.user
      }).populate('profile')
        .then(u => {
          if (u) {
            socket.profile = u.profile
            next()
          } else {
            next(new Error('Authentication error'))
          }
        })
    })
  } else {
    next(new Error('Authentication error'))
  }
})

// Socket event
liveData.on('connection', function (socket) {
  console.warn(`A user connected live ${socket.profile.name}`)

  socket.on('disconnect', () => {
    console.log(socket.connected) // false
  })
  socket.on('error', (err) => {
    console.error(err)
  })
  socket.emit('connect_profile', socket.profile)
})

pubsub.sub().then((sub) => {
  sub.on('message', function (message, content, ackOrNack) {
    ackOrNack()
    Object.entries(Object.fromEntries(liveData.sockets))
      .filter(([, v]) => content.keys.includes(v.profile._id.toString()))
      .map(([k, v]) => {
        return v.emit(content.type, content.payload)
      })
  })
}).catch(console.error)

server.listen(4000, () => {
  console.warn(`Server listen on http://localhost:${process.env.PORT || 4000}/api-docs`)
})

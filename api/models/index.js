const moongose = require('mongoose')
const connect = moongose.connect('mongodb://mongodb:27017/db')
exports.User = require('./User.js')
exports.Post = require('./Post.js')
exports.Comment = require('./Comment.js')
exports.Profile = require('./Profile.js')

moongose.connection.on('error', (args) => {
  console.error(`${JSON.stringify(args)}`)
})
moongose.connection.on('connected', (args) => {
  console.warn(` connected ${JSON.stringify(args)}`)
})
moongose.connection.on('disconnected', (args) => {
  console.error(`${JSON.stringify(args)}`)
})

exports.Connection = connect

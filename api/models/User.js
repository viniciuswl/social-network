const mongoose = require('mongoose')

/**
 * @typedef User
 * @property {string} _id
 * @property {string} user.required
 * @property {string} password.required
 * @property {Profile} profile - User's Profile
 */

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User can't be empty"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password can't be empty"]
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  {
    timestamps: true
  }
)

const user = mongoose.model('User', userSchema)

module.exports = user

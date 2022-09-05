const mongoose = require('mongoose')

/**
 * @typedef Profile
 * @property {string} _id
 * @property {string} name.required
 * @property {User} user.required - User
 * @property {Array.<Profile>} - Following profiles
 */

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name cannot be empty']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }],
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)
profileSchema.index({ name: 'text' })

const profile = mongoose.model('Profile', profileSchema)

module.exports = profile

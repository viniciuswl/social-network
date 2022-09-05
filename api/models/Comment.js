const mongoose = require('mongoose')

/**
 * @typedef Comment
 * @property {string} _id
 * @property {string} content.required - Comment description
 * @property {Profile} profile.required - Profile
 * @property {Post} post.required - Post
 */

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
      required: true
    },
    content: {
      type: String,
      required: [true, "Comments content can't be empty"]
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }]
  },
  {
    timestamps: true
  }
)

const comments = mongoose.model('Comment', commentSchema)

module.exports = comments

const mongoose = require('mongoose')
/**
 * @typedef Post
 * @property {string} _id
 * @property {string} title.required - Title
 * @property {string} content.required - Content
 * @property {Profile} profile.required - Profile
 * @property {Array.<Comment>} comments - Comments
 */
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty"],
      minLength: [5, 'Title must be at least 5 characters, " {VALUE} " does not have the minimum size']
    },
    content: {
      type: String,
      required: [true, "Post content can't be empty"]
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }],
    image: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const posts = mongoose.model('Post', postSchema)

module.exports = posts

const express = require('express')
const { Post, Comment } = require('../models')

const router = express.Router()

router
  .route('/posts/:postId/comments')
  /**
     * This function post a Comment into a Post
    * @group Comment - api
    * @route POST /posts/{postId}/comments
    * @param {string} postId.path.required - Post ID
    * @param {Comment.model} comment.body.required - Comment Model
    * @security JWT
    */
  .post((req, res, next) => Promise.resolve()
    .then(() => new Comment({ ...req.body, post: req.params.postId, profile: req.user.profile }).save())
    .then(data => Post.findByIdAndUpdate(data.post, { $push: { comments: data } })
      .then(post => req.publish('comment', [post.profile], data))
      .then(() => data))
    .then((data) => res.status(201).send({ _id: data.id, content: data.content, profile: data.profile }))
    .catch(err => next(err))
  )
  /**
     * This function get Comments of a Post
    * @group Comment - api
    * @route GET /posts/{postId}/comments
    * @param {string} postId.path.required - Post ID
    * @returns {Array<Comment>} 200 - An array of comments
    * @returns {Error} default - Unexpected error
    * @security JWT
    */
  .get((req, res, next) => Promise.resolve()
    .then(() => Comment.find({ post: req.params.postId }).populate('post'))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err))
  )

router
  .route('/posts/:postId/comments/:id')
  /**
    * This function gets a Comment by id
    * @group Comment - api
    * @route GET /posts/{postId}/comments/{id}
    * @param {string} postId.path.required - Post ID
    * @param {string} id.path.required - Comment ID
    * @returns {<Comment>} 200 - post
    * @security JWT
    */
  .get((req, res, next) => Promise.resolve()
    .then(() => Comment.findById(req.params.id))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  )
  /**
     * This function updates a Comment by ID
     * @group Comment - api
     * @route PUT /posts/{postId}/comments/{id}
     * @param {Comment.model} comment.body.required - Comment Model
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
  .put((req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }))
    .then(() => res.status(200).send({ message: 'Comment Updated' }))
    .catch(err => next(err))
  )
  /**
     * This function deletes a Comment by id
     * @group Comment - api
     * @route DELETE /posts/{postId}/comments/{id}
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
  .delete((req, res, next) => Promise.resolve()
    .then(() => Comment.findById(req.params.id))
    .then(data => Post.findByIdAndUpdate(data.post, { $pull: { comments: data.id } }))
    .then(() => Comment.findByIdAndDelete(req.params.id))
    .then(() => res.status(200).send({ message: 'Comment successfully deleted' }))
    .catch(err => next(err)))

router
  .route('/posts/:postId/comments/:id/like')
  /**
     * This function likes a comment by ID
     * @group Comment - api
     * @route POST /posts/{postId}/comments/{id}/like
     * @param {string} postId.path.required - Post ID
     * @param {string} id.path.required - Comment ID
     * @security JWT
     */
  .post((req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate(req.params.id, { $push: { likes: req.user.profile } }))
    .then(comment => req.publish('comment-like', [comment.profile], comment))
    .then(() => res.status(200).send({ message: 'Liked comment' }))
    .catch(err => next(err))
  )

router
  .route('/posts/:postId/comments/:id/unlike')
  /**
   * This function unlikes a comment by ID
   * @group Comment - api
   * @route POST /posts/{postId}/comments/{id}/unlike
   * @param {string} postId.path.required - Post ID
   * @param {string} id.path.required - Comment ID
   * @security JWT
   */
  .post((req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.profile } }))
    .then(comment => req.publish('comment-unlike', [comment.profile], comment))
    .then(() => res.status(200).send({ message: 'Comment Unliked' }))
    .catch(err => next(err))
  )

module.exports = router

const express = require('express')
const { Post } = require('../models')
const upload = require('../lib/upload')

const router = express.Router()

router
  .route('/posts')
  /**
     * This function gets all Posts
     * @group Post - api
     * @route GET /posts
     * @returns {Array<Post>} 200 - An array of Posts
     * @returns {Error} default - Unexpected error
     * @security JWT
    */
  .get((req, res, next) => Promise.resolve()
    .then(() => Post.find({}))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err))
  )
  /**
     * This function posts a Post
     * @group Post - api
     * @route POST /posts
     * @param {Post.model} post.body.required - Post Model
     * @security JWT
     */
  .post(upload.concat([(req, res, next) => Promise.resolve()
    .then(() => new Post({ ...req.body, profile: req.user.profile }).save())
    .then((data) => req.publish('post', req.user.profile.followers || [], data))
    .then(() => res.status(201).send({ message: 'Post created' }))
    .catch(err => next(err))])
  )

router
  .route('/posts/:id')
  /**
     * This function gets a Post by ID
     * @group Post - api
     * @route GET /posts/{id}
     * @param {string} id.path.required - Post ID
     * @returns {<Post>} 200 - post
     * @security JWT
     */
  .get((req, res, next) => Promise.resolve()
    .then(() => Post.findById(req.params.id).populate({ path: 'comments', populate: { path: 'profile' } }).populate('profile'))
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
  )
  /**
     * This function deletes a post by id
     * @group Post - api
     * @route DELETE /posts/{id}
     * @param {string} id.path.required - Post ID
     * @security JWT
     */
  .delete((req, res, next) => Promise.resolve()
    .then(() => Post.deleteOne({ _id: req.params.id }))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err))
  )/**
     * This function updates a Post by Id
     * @group Post - api
     * @route PUT /posts/{id}
     * @param {Post.model} post.body.required - Post Model
     * @param {string} id.path.required - Post ID
     * @security JWT
     */
  .put((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    }))
    .then(() => res.status(200).send({ message: 'Post successfully updated' }))
    .catch(err => next(err))
  )

router
  .route('/posts/:id/like')
  /**
    * This function likes a POST by ID
    * @group Post - api
    * @route POST /posts/{id}/like
    * @param {string} id.path.required - Post ID
    * @security JWT
    */
  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user.profile.id } }))
    .then((post) => req.publish('post-like', [post.profile], post))
    .then(() => res.status(200).send({ message: 'Liked post' }))
    .catch(err => next(err))
  )

router
  .route('/posts/:id/unlike')
  /**
    * This function likes a POST by ID
    * @group Post - api
    * @route POST /posts/{id}/unlike
    * @param {string} id.path.required - Post ID
    * @security JWT
    */
  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.profile.id } }))
    .then((post) => req.publish('post-unlike', [post.profile], post))
    .then(() => res.status(200).send({ message: 'Unliked post' }))
    .catch(err => next(err))
  )

module.exports = router

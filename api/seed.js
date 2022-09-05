const bcrypt = require('bcryptjs')
const { Post, Comment, Profile, User } = require('./models')

function createUser (name) {
  return bcrypt.hash('password', 10)
    .then(password =>
      new User({ user: name, password }).save()
        .then(data => new Profile({ name: data.user, user: data.id }).save()
          .then(profile => User.findByIdAndUpdate(data.id, { profile: profile.id })
          )
        )
    )
}

function getProfile (user) {
  return Profile.findOne({ user: user.id }).then(p => p)
}

function createPost (profile) {
  return new Post({ title: 'post1', content: 'post1', profile: profile.id }).save()
    .then(post => new Comment({ content: 'comment1', post: post.id, profile: profile.id }).save()
      .then(comment => Post.findByIdAndUpdate(post.id, { $push: { comments: comment.id } }))
    )
}

function follow (profile1, profile2) {
  return Profile.findByIdAndUpdate(profile1.id, { $push: { following: profile2.id } })
    .then(() => Profile.findByIdAndUpdate(profile2.id, { $push: { followers: profile1.id } }))
}

module.exports = Promise.all([
  'Wilson',
  'Vinicius',
  'Quirino'
].map(name => createUser(name)))
  .then(([user1, user2]) => Promise.all([getProfile(user1), getProfile(user2)]))
  .then(([profile1, profile2]) => follow(profile1, profile2).then(() => ([profile1, profile2])))
  .then(([profile1, profile2]) => Promise.all([createPost(profile1), createPost(profile2)]))
  .then(() => console.log('Mongo is Seeded'))

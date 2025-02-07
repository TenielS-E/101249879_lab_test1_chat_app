const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    createon: {
        type: Date
    }
})

UserSchema.pre('save', (next) => {
    let now = Date.now()
    this.createon = now
    next()
});

UserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
  });
  
  UserSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  UserSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  UserSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });
  
  const User = mongoose.model("User", UserSchema);
  module.exports = User;
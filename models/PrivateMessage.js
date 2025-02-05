const mongoose = require('mongoose');

const PrivateMessgeSchema  = new mongoose.Schema({
    from_user: {
        type: String
    },
    to_user: {
        type: String
    },
    room: {
        type: String
    },
    message: {
        type: String
    },
    date_sent: {
        type: Date
    }
})

PrivateMessgeSchema.pre('save', (next) => {
    let now = Date.now()
    this.date_sent = now
    next()
});

PrivateMessgeSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
  });
  
  PrivateMessgeSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  PrivateMessgeSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  PrivateMessgeSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });
  
  const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessgeSchema);
  module.exports = PrivateMessage;
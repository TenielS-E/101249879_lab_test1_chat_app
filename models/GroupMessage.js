const mongoose = require('mongoose');

const GroupMessgeSchema  = new mongoose.Schema({
    from_user: {
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

GroupMessgeSchema.pre('save', (next) => {
    let now = Date.now()
    this.date_sent = now
    next()
});

GroupMessgeSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
  });
  
  GroupMessgeSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  GroupMessgeSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  GroupMessgeSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });
  
  const GroupMessage = mongoose.model("GroupMessage", GroupMessgeSchema);
  module.exports = GroupMessage;
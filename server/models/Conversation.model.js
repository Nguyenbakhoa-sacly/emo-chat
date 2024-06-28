


const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  // nguoi gui
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  // nguoi nhan
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Message'
    }
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Conversation', conversationSchema);
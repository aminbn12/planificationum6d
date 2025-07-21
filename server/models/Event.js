const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['meeting', 'exam', 'conference', 'other'],
    default: 'other'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Populate organizer data
eventSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'organizer',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Event', eventSchema);
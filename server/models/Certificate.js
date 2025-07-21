const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['inscription', 'reussite', 'notes', 'stage']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'ready', 'delivered'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: true
  },
  copies: {
    type: Number,
    default: 1,
    min: 1
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  completionDate: Date
}, {
  timestamps: true
});

// Populate student data
certificateSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'student',
    populate: {
      path: 'user',
      select: 'name email'
    }
  });
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
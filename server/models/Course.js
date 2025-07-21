const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', 'Doctorat']
  },
  day: {
    type: String,
    required: true,
    enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 30
  },
  room: String,
  maxStudents: {
    type: Number,
    default: 50
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Populate professor data
courseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'professor',
    populate: {
      path: 'user',
      select: 'name email'
    }
  });
  next();
});

// Virtual for enrolled count
courseSchema.virtual('enrolledCount').get(function() {
  return this.enrolledStudents.length;
});

module.exports = mongoose.model('Course', courseSchema);
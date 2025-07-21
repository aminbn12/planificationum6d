const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année', 'Doctorat']
  },
  average: {
    type: Number,
    min: 0,
    max: 20,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  },
  phone: String,
  address: String,
  birthDate: Date,
  nationality: String,
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  emergencyContact: {
    name: String,
    phone: String
  },
  previousEducation: String,
  specialization: String
}, {
  timestamps: true
});

// Populate user data when querying
studentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Student', studentSchema);
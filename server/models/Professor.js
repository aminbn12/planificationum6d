const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  specialty: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Médecine Interne', 'Chirurgie', 'Pédiatrie', 'Gynécologie', 'Cardiologie', 'Neurologie', 'Psychiatrie']
  },
  courses: [{
    type: String
  }],
  hireDate: {
    type: Date,
    default: Date.now
  },
  phone: String,
  address: String,
  birthDate: Date,
  nationality: String,
  qualifications: [String],
  experience: String,
  publications: String,
  researchInterests: String,
  officeLocation: String,
  officeHours: String
}, {
  timestamps: true
});

// Populate user data when querying
professorSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Professor', professorSchema);
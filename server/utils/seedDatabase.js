const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Professor = require('../models/Professor');
const connectDB = require('../config/database');

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Professor.deleteMany({});
    
    console.log('🗑️  Cleared existing data');
    
    // Create admin user
    const adminUser = new User({
      name: 'Dr. Ahmed Ben Ali',
      email: 'admin@um6d.ma',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    
    // Create professor user
    const profUser = new User({
      name: 'Prof. Sarah Martin',
      email: 'prof@um6d.ma',
      password: 'prof123',
      role: 'professor'
    });
    await profUser.save();
    
    // Create professor profile
    const professor = new Professor({
      user: profUser._id,
      employeeId: 'UM6D-PROF-001',
      specialty: 'Cardiologie',
      department: 'Médecine Interne',
      courses: ['Cardiologie Clinique', 'Électrocardiographie'],
      hireDate: new Date('2018-09-01')
    });
    await professor.save();
    
    // Create student user
    const studentUser = new User({
      name: 'Marie Dupont',
      email: 'student@um6d.ma',
      password: 'student123',
      role: 'student'
    });
    await studentUser.save();
    
    // Create student profile
    const student = new Student({
      user: studentUser._id,
      studentId: 'UM6D2021001',
      year: '3ème année',
      average: 15.2,
      status: 'active',
      phone: '0612345678',
      enrollmentDate: new Date('2021-09-15')
    });
    await student.save();
    
    console.log('✅ Database seeded successfully');
    console.log('👤 Admin: admin@um6d.ma / admin123');
    console.log('👨‍🏫 Professor: prof@um6d.ma / prof123');
    console.log('👨‍🎓 Student: student@um6d.ma / student123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
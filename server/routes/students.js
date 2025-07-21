const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Mock database
let students = [
  {
    id: 1,
    name: 'Marie Dupont',
    email: 'marie.dupont@um6d.ma',
    role: 'student',
    year: '3ème année',
    average: 15.2,
    status: 'active',
    phone: '0612345678',
    enrollmentDate: '2021-09-15',
    address: '123 Rue de la Paix, Rabat',
    birthDate: '1995-03-15',
    nationality: 'Marocaine',
    studentId: 'UM6D2021001'
  },
  {
    id: 2,
    name: 'Ahmed Ben Ali',
    email: 'ahmed.benali@um6d.ma',
    role: 'student',
    year: '4ème année',
    average: 14.8,
    status: 'active',
    phone: '0623456789',
    enrollmentDate: '2020-09-15',
    address: '456 Avenue Mohammed V, Casablanca',
    birthDate: '1994-08-22',
    nationality: 'Marocaine',
    studentId: 'UM6D2020002'
  }
];

// Get all students
router.get('/', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const { year, status, search } = req.query;
  
  let filteredStudents = students;
  
  if (year) {
    filteredStudents = filteredStudents.filter(s => s.year === year);
  }
  
  if (status) {
    filteredStudents = filteredStudents.filter(s => s.status === status);
  }
  
  if (search) {
    filteredStudents = filteredStudents.filter(s => 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filteredStudents);
});

// Get student by ID
router.get('/:id', authenticateToken, (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  // Students can only access their own data
  if (req.user.role === 'student' && req.user.id !== studentId) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.json(student);
});

// Create new student
router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const {
    name,
    email,
    year,
    phone,
    address,
    birthDate,
    nationality,
    studentId,
    status = 'active'
  } = req.body;
  
  if (!name || !email || !year || !studentId) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  const existingStudent = students.find(s => s.email === email || s.studentId === studentId);
  if (existingStudent) {
    return res.status(409).json({ message: 'Student already exists' });
  }
  
  const newStudent = {
    id: Math.max(...students.map(s => s.id)) + 1,
    name,
    email,
    role: 'student',
    year,
    phone,
    address,
    birthDate,
    nationality,
    studentId,
    status,
    enrollmentDate: new Date().toISOString().split('T')[0],
    average: 0
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
router.put('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  const updatedStudent = {
    ...students[studentIndex],
    ...req.body,
    id: studentId // Ensure ID doesn't change
  };
  
  students[studentIndex] = updatedStudent;
  res.json(updatedStudent);
});

// Delete student
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students.splice(studentIndex, 1);
  res.json({ message: 'Student deleted successfully' });
});

// Get student statistics
router.get('/stats/overview', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
    graduated: students.filter(s => s.status === 'graduated').length,
    byYear: {}
  };
  
  // Group by year
  students.forEach(student => {
    if (!stats.byYear[student.year]) {
      stats.byYear[student.year] = 0;
    }
    stats.byYear[student.year]++;
  });
  
  res.json(stats);
});

module.exports = router;
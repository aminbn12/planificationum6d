const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Mock database
let professors = [
  {
    id: 1,
    name: 'Dr. Hassan Alami',
    email: 'hassan.alami@um6d.ma',
    role: 'professor',
    specialty: 'Cardiologie',
    department: 'Médecine Interne',
    courses: ['Cardiologie Clinique', 'Électrocardiographie'],
    hireDate: '2018-09-01',
    phone: '0661234567',
    address: '456 Avenue Mohammed V, Casablanca',
    birthDate: '1975-08-22',
    nationality: 'Marocaine',
    employeeId: 'UM6D-PROF-001'
  },
  {
    id: 2,
    name: 'Prof. Fatima Zahra',
    email: 'fatima.zahra@um6d.ma',
    role: 'professor',
    specialty: 'Pédiatrie',
    department: 'Pédiatrie',
    courses: ['Pédiatrie Générale', 'Néonatologie'],
    hireDate: '2015-09-01',
    phone: '0672345678',
    address: '789 Rue Hassan II, Rabat',
    birthDate: '1970-12-10',
    nationality: 'Marocaine',
    employeeId: 'UM6D-PROF-002'
  }
];

// Get all professors
router.get('/', authenticateToken, (req, res) => {
  const { department, specialty, search } = req.query;
  
  let filteredProfessors = professors;
  
  if (department) {
    filteredProfessors = filteredProfessors.filter(p => p.department === department);
  }
  
  if (specialty) {
    filteredProfessors = filteredProfessors.filter(p => p.specialty === specialty);
  }
  
  if (search) {
    filteredProfessors = filteredProfessors.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filteredProfessors);
});

// Get professor by ID
router.get('/:id', authenticateToken, (req, res) => {
  const professorId = parseInt(req.params.id);
  const professor = professors.find(p => p.id === professorId);
  
  if (!professor) {
    return res.status(404).json({ message: 'Professor not found' });
  }
  
  res.json(professor);
});

// Create new professor
router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const {
    name,
    email,
    specialty,
    department,
    courses = [],
    phone,
    address,
    birthDate,
    nationality,
    employeeId
  } = req.body;
  
  if (!name || !email || !specialty || !department || !employeeId) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  const existingProfessor = professors.find(p => p.email === email || p.employeeId === employeeId);
  if (existingProfessor) {
    return res.status(409).json({ message: 'Professor already exists' });
  }
  
  const newProfessor = {
    id: Math.max(...professors.map(p => p.id)) + 1,
    name,
    email,
    role: 'professor',
    specialty,
    department,
    courses,
    phone,
    address,
    birthDate,
    nationality,
    employeeId,
    hireDate: new Date().toISOString().split('T')[0]
  };
  
  professors.push(newProfessor);
  res.status(201).json(newProfessor);
});

// Update professor
router.put('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const professorId = parseInt(req.params.id);
  const professorIndex = professors.findIndex(p => p.id === professorId);
  
  if (professorIndex === -1) {
    return res.status(404).json({ message: 'Professor not found' });
  }
  
  const updatedProfessor = {
    ...professors[professorIndex],
    ...req.body,
    id: professorId // Ensure ID doesn't change
  };
  
  professors[professorIndex] = updatedProfessor;
  res.json(updatedProfessor);
});

// Delete professor
router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const professorId = parseInt(req.params.id);
  const professorIndex = professors.findIndex(p => p.id === professorId);
  
  if (professorIndex === -1) {
    return res.status(404).json({ message: 'Professor not found' });
  }
  
  professors.splice(professorIndex, 1);
  res.json({ message: 'Professor deleted successfully' });
});

// Get professor statistics
router.get('/stats/overview', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const stats = {
    total: professors.length,
    byDepartment: {},
    bySpecialty: {}
  };
  
  // Group by department and specialty
  professors.forEach(professor => {
    if (!stats.byDepartment[professor.department]) {
      stats.byDepartment[professor.department] = 0;
    }
    stats.byDepartment[professor.department]++;
    
    if (!stats.bySpecialty[professor.specialty]) {
      stats.bySpecialty[professor.specialty] = 0;
    }
    stats.bySpecialty[professor.specialty]++;
  });
  
  res.json(stats);
});

module.exports = router;
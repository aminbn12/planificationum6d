const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Mock database
let courses = [
  {
    id: 1,
    name: 'Cardiologie Clinique',
    professor: 'Dr. Hassan Alami',
    professorId: 1,
    year: '4ème année',
    day: 'Lundi',
    time: '09:00',
    duration: 120,
    room: 'Amphi A',
    maxStudents: 80,
    enrolledStudents: 75,
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Pédiatrie Générale',
    professor: 'Prof. Fatima Zahra',
    professorId: 2,
    year: '3ème année',
    day: 'Mardi',
    time: '14:00',
    duration: 90,
    room: 'Salle 201',
    maxStudents: 50,
    enrolledStudents: 48,
    date: '2024-01-16'
  }
];

// Get all courses
router.get('/', authenticateToken, (req, res) => {
  const { year, professor, day, startDate, endDate } = req.query;
  
  let filteredCourses = courses;
  
  if (year) {
    filteredCourses = filteredCourses.filter(c => c.year === year);
  }
  
  if (professor) {
    filteredCourses = filteredCourses.filter(c => c.professor === professor);
  }
  
  if (day) {
    filteredCourses = filteredCourses.filter(c => c.day === day);
  }
  
  if (startDate && endDate) {
    filteredCourses = filteredCourses.filter(c => 
      c.date >= startDate && c.date <= endDate
    );
  }
  
  res.json(filteredCourses);
});

// Get course by ID
router.get('/:id', authenticateToken, (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  
  res.json(course);
});

// Create new course
router.post('/', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const {
    name,
    professor,
    professorId,
    year,
    day,
    time,
    duration,
    room,
    maxStudents,
    date
  } = req.body;
  
  if (!name || !professor || !year || !day || !time || !duration || !room || !date) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  // Check for scheduling conflicts
  const conflict = courses.find(c => 
    c.date === date && 
    c.time === time && 
    c.room === room
  );
  
  if (conflict) {
    return res.status(409).json({ message: 'Scheduling conflict detected' });
  }
  
  const newCourse = {
    id: Math.max(...courses.map(c => c.id)) + 1,
    name,
    professor,
    professorId,
    year,
    day,
    time,
    duration,
    room,
    maxStudents,
    enrolledStudents: 0,
    date
  };
  
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Update course
router.put('/:id', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }
  
  // Check for scheduling conflicts (excluding current course)
  if (req.body.date && req.body.time && req.body.room) {
    const conflict = courses.find(c => 
      c.id !== courseId &&
      c.date === req.body.date && 
      c.time === req.body.time && 
      c.room === req.body.room
    );
    
    if (conflict) {
      return res.status(409).json({ message: 'Scheduling conflict detected' });
    }
  }
  
  const updatedCourse = {
    ...courses[courseIndex],
    ...req.body,
    id: courseId // Ensure ID doesn't change
  };
  
  courses[courseIndex] = updatedCourse;
  res.json(updatedCourse);
});

// Delete course
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === courseId);
  
  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }
  
  courses.splice(courseIndex, 1);
  res.json({ message: 'Course deleted successfully' });
});

// Enroll student in course
router.post('/:id/enroll', authenticateToken, (req, res) => {
  const courseId = parseInt(req.params.id);
  const { studentId } = req.body;
  
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  
  if (course.enrolledStudents >= course.maxStudents) {
    return res.status(400).json({ message: 'Course is full' });
  }
  
  course.enrolledStudents++;
  res.json({ message: 'Student enrolled successfully', course });
});

// Get course statistics
router.get('/stats/overview', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const stats = {
    total: courses.length,
    byYear: {},
    byDay: {},
    occupancyRate: 0
  };
  
  let totalCapacity = 0;
  let totalEnrolled = 0;
  
  courses.forEach(course => {
    // By year
    if (!stats.byYear[course.year]) {
      stats.byYear[course.year] = 0;
    }
    stats.byYear[course.year]++;
    
    // By day
    if (!stats.byDay[course.day]) {
      stats.byDay[course.day] = 0;
    }
    stats.byDay[course.day]++;
    
    // Occupancy
    totalCapacity += course.maxStudents;
    totalEnrolled += course.enrolledStudents;
  });
  
  stats.occupancyRate = totalCapacity > 0 ? (totalEnrolled / totalCapacity * 100).toFixed(1) : 0;
  
  res.json(stats);
});

module.exports = router;
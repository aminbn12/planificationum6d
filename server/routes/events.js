const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Mock database
let events = [
  {
    id: 1,
    title: 'Réunion pédagogique',
    description: 'Réunion mensuelle du conseil pédagogique',
    date: '2024-01-15',
    time: '14:00',
    location: 'Salle de conférence',
    type: 'meeting',
    organizer: 'Dr. Ahmed Ben Ali',
    organizerId: 1
  },
  {
    id: 2,
    title: 'Examens finaux',
    description: 'Session d\'examens de fin de semestre',
    date: '2024-01-20',
    time: '08:00',
    location: 'Toutes les salles',
    type: 'exam',
    organizer: 'Administration',
    organizerId: null
  }
];

// Get all events
router.get('/', authenticateToken, (req, res) => {
  const { type, startDate, endDate, organizer } = req.query;
  
  let filteredEvents = events;
  
  if (type) {
    filteredEvents = filteredEvents.filter(e => e.type === type);
  }
  
  if (organizer) {
    filteredEvents = filteredEvents.filter(e => e.organizer === organizer);
  }
  
  if (startDate && endDate) {
    filteredEvents = filteredEvents.filter(e => 
      e.date >= startDate && e.date <= endDate
    );
  }
  
  res.json(filteredEvents);
});

// Get event by ID
router.get('/:id', authenticateToken, (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  res.json(event);
});

// Create new event
router.post('/', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    type = 'other'
  } = req.body;
  
  if (!title || !date || !time || !location) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  
  const newEvent = {
    id: Math.max(...events.map(e => e.id)) + 1,
    title,
    description,
    date,
    time,
    location,
    type,
    organizer: req.user.name || 'Unknown',
    organizerId: req.user.id
  };
  
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Update event
router.put('/:id', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  // Check if user can edit this event
  const event = events[eventIndex];
  if (req.user.role !== 'admin' && event.organizerId !== req.user.id) {
    return res.status(403).json({ message: 'You can only edit your own events' });
  }
  
  const updatedEvent = {
    ...events[eventIndex],
    ...req.body,
    id: eventId // Ensure ID doesn't change
  };
  
  events[eventIndex] = updatedEvent;
  res.json(updatedEvent);
});

// Delete event
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'professor'), (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(e => e.id === eventId);
  
  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found' });
  }
  
  // Check if user can delete this event
  const event = events[eventIndex];
  if (req.user.role !== 'admin' && event.organizerId !== req.user.id) {
    return res.status(403).json({ message: 'You can only delete your own events' });
  }
  
  events.splice(eventIndex, 1);
  res.json({ message: 'Event deleted successfully' });
});

// Get upcoming events
router.get('/upcoming/list', authenticateToken, (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);
  
  res.json(upcomingEvents);
});

module.exports = router;
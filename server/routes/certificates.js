const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Mock database
let certificates = [
  {
    id: 1,
    studentId: 3,
    studentName: 'Marie Dupont',
    type: 'inscription',
    status: 'pending',
    requestDate: '2024-01-10',
    reason: 'Demande de bourse',
    copies: 2
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Ahmed Ben Ali',
    type: 'reussite',
    status: 'processing',
    requestDate: '2024-01-08',
    reason: 'Candidature master',
    copies: 1
  }
];

// Get all certificates
router.get('/', authenticateToken, (req, res) => {
  const { status, type, studentId } = req.query;
  
  let filteredCertificates = certificates;
  
  // Students can only see their own certificates
  if (req.user.role === 'student') {
    filteredCertificates = filteredCertificates.filter(c => c.studentId === req.user.id);
  }
  
  if (status) {
    filteredCertificates = filteredCertificates.filter(c => c.status === status);
  }
  
  if (type) {
    filteredCertificates = filteredCertificates.filter(c => c.type === type);
  }
  
  if (studentId && req.user.role !== 'student') {
    filteredCertificates = filteredCertificates.filter(c => c.studentId === parseInt(studentId));
  }
  
  res.json(filteredCertificates);
});

// Get certificate by ID
router.get('/:id', authenticateToken, (req, res) => {
  const certificateId = parseInt(req.params.id);
  const certificate = certificates.find(c => c.id === certificateId);
  
  if (!certificate) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  
  // Students can only access their own certificates
  if (req.user.role === 'student' && certificate.studentId !== req.user.id) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.json(certificate);
});

// Create new certificate request
router.post('/', authenticateToken, (req, res) => {
  const {
    type,
    reason,
    copies = 1
  } = req.body;
  
  if (!type || !reason) {
    return res.status(400).json({ message: 'Type and reason are required' });
  }
  
  const validTypes = ['inscription', 'reussite', 'notes', 'stage'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: 'Invalid certificate type' });
  }
  
  const newCertificate = {
    id: Math.max(...certificates.map(c => c.id)) + 1,
    studentId: req.user.id,
    studentName: req.user.name,
    type,
    status: 'pending',
    requestDate: new Date().toISOString().split('T')[0],
    reason,
    copies
  };
  
  certificates.push(newCertificate);
  res.status(201).json(newCertificate);
});

// Update certificate status
router.put('/:id/status', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const certificateId = parseInt(req.params.id);
  const { status } = req.body;
  
  const validStatuses = ['pending', 'processing', 'ready', 'delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  const certificateIndex = certificates.findIndex(c => c.id === certificateId);
  if (certificateIndex === -1) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  
  certificates[certificateIndex].status = status;
  
  if (status === 'ready' || status === 'delivered') {
    certificates[certificateIndex].completionDate = new Date().toISOString().split('T')[0];
  }
  
  res.json(certificates[certificateIndex]);
});

// Delete certificate request
router.delete('/:id', authenticateToken, (req, res) => {
  const certificateId = parseInt(req.params.id);
  const certificateIndex = certificates.findIndex(c => c.id === certificateId);
  
  if (certificateIndex === -1) {
    return res.status(404).json({ message: 'Certificate not found' });
  }
  
  const certificate = certificates[certificateIndex];
  
  // Students can only delete their own pending certificates
  if (req.user.role === 'student') {
    if (certificate.studentId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    if (certificate.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot delete certificate in processing' });
    }
  }
  
  certificates.splice(certificateIndex, 1);
  res.json({ message: 'Certificate request deleted successfully' });
});

// Get certificate statistics
router.get('/stats/overview', authenticateToken, authorizeRoles('admin'), (req, res) => {
  const stats = {
    total: certificates.length,
    pending: certificates.filter(c => c.status === 'pending').length,
    processing: certificates.filter(c => c.status === 'processing').length,
    ready: certificates.filter(c => c.status === 'ready').length,
    delivered: certificates.filter(c => c.status === 'delivered').length,
    byType: {}
  };
  
  // Group by type
  certificates.forEach(certificate => {
    if (!stats.byType[certificate.type]) {
      stats.byType[certificate.type] = 0;
    }
    stats.byType[certificate.type]++;
  });
  
  res.json(stats);
});

module.exports = router;
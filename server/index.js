const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/students');
const professorsRoutes = require('./routes/professors');
const coursesRoutes = require('./routes/courses');
const eventsRoutes = require('./routes/events');
const certificatesRoutes = require('./routes/certificates');
const nationalitiesRoutes = require('./routes/nationalities');

// Load environment variables
dotenv.config();

// Vérifier que MONGODB_URI est défini
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI n\'est pas défini dans le fichier .env');
  console.log('📝 Créez un fichier .env avec votre URI MongoDB Atlas');
  process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/professors', professorsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/nationalities', nationalitiesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
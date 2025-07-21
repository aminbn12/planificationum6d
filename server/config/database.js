const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
      socketTimeoutMS: 45000, // Fermer les sockets après 45 secondes d'inactivité
    });

    console.log(`🗄️  MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error.message);
    console.error('🔍 Vérifiez votre connexion internet et vos identifiants MongoDB Atlas');
    process.exit(1);
  }
};

module.exports = connectDB;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Test de connexion à MongoDB Atlas...\n');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI non défini dans .env');
    }
    
    console.log('🌐 URI de connexion configurée');
    console.log('⏳ Connexion en cours...\n');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 secondes
    });
    
    console.log('✅ Connexion réussie !');
    console.log(`🏠 Hôte: ${conn.connection.host}`);
    console.log(`📊 Base de données: ${conn.connection.name}`);
    console.log(`🔌 État: ${conn.connection.readyState === 1 ? 'Connecté' : 'Déconnecté'}\n`);
    
    // Test d'écriture
    console.log('📝 Test d\'écriture...');
    const testCollection = conn.connection.db.collection('connection_test');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date(),
      message: 'Test de connexion réussi'
    });
    console.log('✅ Écriture réussie !');
    
    // Nettoyage
    await testCollection.deleteMany({ test: true });
    console.log('🧹 Nettoyage effectué');
    
    await mongoose.connection.close();
    console.log('\n🎉 Test de connexion terminé avec succès !');
    
  } catch (error) {
    console.error('\n❌ Erreur de connexion:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('authentication failed')) {
      console.log('🔐 Problème d\'authentification:');
      console.log('   • Vérifiez votre nom d\'utilisateur et mot de passe');
      console.log('   • Assurez-vous que l\'utilisateur a les bonnes permissions');
    } else if (error.message.includes('network')) {
      console.log('🌐 Problème de réseau:');
      console.log('   • Vérifiez votre connexion internet');
      console.log('   • Vérifiez que votre IP est autorisée dans MongoDB Atlas');
    }
    
    process.exit(1);
  }
};

// Exécuter si appelé directement
if (require.main === module) {
  testConnection();
}

module.exports = testConnection;
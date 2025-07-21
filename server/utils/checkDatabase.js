const mongoose = require('mongoose');
const connectDB = require('../config/database');

const checkDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🔍 Vérification de la base de données...\n');
    
    // Lister toutes les collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('📋 Aucune collection trouvée. Les collections seront créées automatiquement lors de la première utilisation.\n');
      
      console.log('📚 Collections qui seront créées :');
      console.log('  • users - Tous les utilisateurs (admin, professeurs, étudiants)');
      console.log('  • students - Profils détaillés des étudiants');
      console.log('  • professors - Profils détaillés des professeurs');
      console.log('  • courses - Planification des cours');
      console.log('  • events - Événements universitaires');
      console.log('  • certificates - Demandes d\'attestations\n');
      
      console.log('💡 Pour créer des données de test, exécutez : npm run seed');
    } else {
      console.log('📋 Collections existantes :');
      for (const collection of collections) {
        const count = await mongoose.connection.db.collection(collection.name).countDocuments();
        console.log(`  • ${collection.name} - ${count} documents`);
      }
    }
    
    console.log('\n✅ Base de données prête !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la vérification :', error);
    process.exit(1);
  }
};

// Exécuter si appelé directement
if (require.main === module) {
  checkDatabase();
}

module.exports = checkDatabase;
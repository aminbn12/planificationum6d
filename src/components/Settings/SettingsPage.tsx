import React, { useState } from 'react';
import { Save, Users, UserPlus, Download, Database, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNationalities } from '../../services/nationalitiesApi';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { nationalities, loading: nationalitiesLoading } = useNationalities();
  
  const [settings, setSettings] = useState({
    universityName: 'Université Mohamed VI D',
    academicYear: '2023-2024',
    language: 'fr',
    timezone: 'Africa/Casablanca',
    emailNotifications: true,
    systemMaintenance: false
  });

  const [userCreation, setUserCreation] = useState({
    type: 'student',
    name: '',
    email: '',
    password: '',
    year: '',
    specialty: '',
    department: ''
  });

  const [showUserCreation, setShowUserCreation] = useState(false);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  const handleUserCreationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create user logic
    console.log('User created:', userCreation);
    setUserCreation({
      type: 'student',
      name: '',
      email: '',
      password: '',
      year: '',
      specialty: '',
      department: ''
    });
    setShowUserCreation(false);
  };

  const handleExportData = () => {
    // Export data logic
    console.log('Exporting data...');
  };

  const handleBackupData = () => {
    // Backup data logic
    console.log('Backing up data...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérez les paramètres du système et créez des utilisateurs</p>
      </div>

      {user?.role === 'admin' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Création d'utilisateurs</h2>
              <button
                onClick={() => setShowUserCreation(!showUserCreation)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Créer un utilisateur</span>
              </button>
            </div>
          </div>

          {showUserCreation && (
            <div className="p-6 border-b bg-gray-50">
              <form onSubmit={handleUserCreationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'utilisateur
                    </label>
                    <select
                      value={userCreation.type}
                      onChange={(e) => setUserCreation({...userCreation, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="student">Étudiant</option>
                      <option value="professor">Professeur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={userCreation.name}
                      onChange={(e) => setUserCreation({...userCreation, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userCreation.email}
                      onChange={(e) => setUserCreation({...userCreation, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe temporaire
                    </label>
                    <input
                      type="password"
                      value={userCreation.password}
                      onChange={(e) => setUserCreation({...userCreation, password: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  {userCreation.type === 'student' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Année d'études
                      </label>
                      <select
                        value={userCreation.year}
                        onChange={(e) => setUserCreation({...userCreation, year: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Sélectionner</option>
                        <option value="1">1ère année</option>
                        <option value="2">2ème année</option>
                        <option value="3">3ème année</option>
                        <option value="4">4ème année</option>
                        <option value="5">5ème année</option>
                        <option value="6">6ème année</option>
                        <option value="R1">Doctorat R1</option>
                        <option value="R2">Doctorat R2</option>
                        <option value="R3">Doctorat R3</option>
                        <option value="R4">Doctorat R4</option>
                      </select>
                    </div>
                  )}
                  {userCreation.type === 'professor' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Spécialité
                        </label>
                        <input
                          type="text"
                          value={userCreation.specialty}
                          onChange={(e) => setUserCreation({...userCreation, specialty: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Département
                        </label>
                        <select
                          value={userCreation.department}
                          onChange={(e) => setUserCreation({...userCreation, department: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Médecine Interne">Médecine Interne</option>
                          <option value="Chirurgie">Chirurgie</option>
                          <option value="Pédiatrie">Pédiatrie</option>
                          <option value="Gynécologie">Gynécologie</option>
                          <option value="Cardiologie">Cardiologie</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Créer l'utilisateur
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUserCreation(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Paramètres généraux</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSettingsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'université
                </label>
                <input
                  type="text"
                  value={settings.universityName}
                  onChange={(e) => setSettings({...settings, universityName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année académique
                </label>
                <select
                  value={settings.academicYear}
                  onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langue
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="email-notifications" className="text-sm text-gray-700">
                  Notifications par email
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Sauvegarder les paramètres</span>
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Actions système</h2>
          </div>
          <div className="p-6 space-y-4">
            <button
              onClick={handleBackupData}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Database className="w-5 h-5" />
              <span>Sauvegarder les données</span>
            </button>
            <button
              onClick={handleExportData}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Exporter les rapports</span>
            </button>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Mode maintenance</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
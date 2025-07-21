import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, Award, FileText, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '0612345678',
    address: '123 Rue de la Paix, Rabat',
    birthDate: '1995-03-15',
    nationality: 'Marocaine'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const getProfileStats = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Année d\'études', value: '3ème année', icon: BookOpen },
          { label: 'Moyenne générale', value: '15.2/20', icon: Award },
          { label: 'Crédits validés', value: '120/180', icon: FileText },
          { label: 'Présences', value: '94%', icon: Calendar }
        ];
      case 'professor':
        return [
          { label: 'Spécialité', value: 'Cardiologie', icon: BookOpen },
          { label: 'Années d\'expérience', value: '8 ans', icon: Award },
          { label: 'Cours enseignés', value: '12', icon: FileText },
          { label: 'Étudiants', value: '245', icon: User }
        ];
      case 'admin':
        return [
          { label: 'Département', value: 'Administration', icon: BookOpen },
          { label: 'Années d\'expérience', value: '5 ans', icon: Award },
          { label: 'Étudiants gérés', value: '1,245', icon: User },
          { label: 'Professeurs', value: '87', icon: FileText }
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => {
    switch (user?.role) {
      case 'student':
        return [
          { action: 'Cours de Cardiologie suivi', date: '2024-01-15', type: 'course' },
          { action: 'Demande d\'attestation soumise', date: '2024-01-10', type: 'document' },
          { action: 'Note obtenue: 16/20 en Pédiatrie', date: '2024-01-08', type: 'grade' },
          { action: 'Inscription au cours de Chirurgie', date: '2024-01-05', type: 'enrollment' }
        ];
      case 'professor':
        return [
          { action: 'Cours de Cardiologie enseigné', date: '2024-01-15', type: 'teaching' },
          { action: 'Notes saisies pour 45 étudiants', date: '2024-01-12', type: 'grading' },
          { action: 'Réunion pédagogique', date: '2024-01-10', type: 'meeting' },
          { action: 'Nouveau cours créé', date: '2024-01-08', type: 'course' }
        ];
      case 'admin':
        return [
          { action: 'Validation de 12 attestations', date: '2024-01-15', type: 'validation' },
          { action: 'Nouvel étudiant inscrit', date: '2024-01-14', type: 'enrollment' },
          { action: 'Rapport mensuel généré', date: '2024-01-12', type: 'report' },
          { action: 'Événement créé', date: '2024-01-10', type: 'event' }
        ];
      default:
        return [];
    }
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      course: <BookOpen className="w-4 h-4" />,
      document: <FileText className="w-4 h-4" />,
      grade: <Award className="w-4 h-4" />,
      enrollment: <User className="w-4 h-4" />,
      teaching: <BookOpen className="w-4 h-4" />,
      grading: <Award className="w-4 h-4" />,
      meeting: <Calendar className="w-4 h-4" />,
      validation: <FileText className="w-4 h-4" />,
      report: <FileText className="w-4 h-4" />,
      event: <Calendar className="w-4 h-4" />
    };
    return icons[type as keyof typeof icons] || <User className="w-4 h-4" />;
  };

  const getActivityColor = (type: string) => {
    const colors = {
      course: 'bg-blue-100 text-blue-600',
      document: 'bg-yellow-100 text-yellow-600',
      grade: 'bg-green-100 text-green-600',
      enrollment: 'bg-purple-100 text-purple-600',
      teaching: 'bg-blue-100 text-blue-600',
      grading: 'bg-green-100 text-green-600',
      meeting: 'bg-orange-100 text-orange-600',
      validation: 'bg-green-100 text-green-600',
      report: 'bg-gray-100 text-gray-600',
      event: 'bg-purple-100 text-purple-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const stats = getProfileStats();
  const activities = getRecentActivity();

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-5 h-5" />
              <span>{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{new Date(profileData.birthDate).toLocaleDateString('fr-FR')}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Statistiques</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
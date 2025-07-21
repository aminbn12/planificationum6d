import React from 'react';
import { Users, UserCheck, Calendar, FileText, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from './StatsCard';
import EventsWidget from './EventsWidget';
import ChartsWidget from './ChartsWidget';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Étudiants',
      value: '1,245',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Professeurs',
      value: '87',
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+3%'
    },
    {
      title: 'Cours',
      value: '156',
      icon: Calendar,
      color: 'bg-yellow-500',
      change: '+8%'
    },
    {
      title: 'Attestations',
      value: '23',
      icon: FileText,
      color: 'bg-purple-500',
      change: '-5%'
    }
  ];

  const adminStats = stats;
  const professorStats = stats.filter(s => s.title !== 'Professeurs');
  const studentStats = [
    {
      title: 'Mes Cours',
      value: '12',
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+2'
    },
    {
      title: 'Moyenne',
      value: '15.2',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+0.8'
    },
    {
      title: 'Présences',
      value: '94%',
      icon: Activity,
      color: 'bg-yellow-500',
      change: '+2%'
    },
    {
      title: 'Attestations',
      value: '2',
      icon: FileText,
      color: 'bg-purple-500',
      change: '+1'
    }
  ];

  const getCurrentStats = () => {
    switch (user?.role) {
      case 'admin':
        return adminStats;
      case 'professor':
        return professorStats;
      case 'student':
        return studentStats;
      default:
        return [];
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
    return `${greeting}, ${user?.name}!`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">{getWelcomeMessage()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getCurrentStats().map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartsWidget />
        </div>
        <div>
          <EventsWidget />
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Nouvel étudiant inscrit</p>
                <span className="text-xs text-gray-400">Il y a 2h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Cours de cardiologie ajouté</p>
                <span className="text-xs text-gray-400">Il y a 4h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Attestation générée</p>
                <span className="text-xs text-gray-400">Il y a 6h</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium">Ajouter un étudiant</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium">Créer un événement</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="font-medium">Générer un rapport</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
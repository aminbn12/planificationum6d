import React from 'react';
import { X, Mail, Phone, Calendar, BookOpen, Award, Users, Clock } from 'lucide-react';
import { Professor } from '../../types';

interface ProfessorProfileProps {
  professor: Professor;
  onClose: () => void;
}

const ProfessorProfile: React.FC<ProfessorProfileProps> = ({ professor, onClose }) => {
  const getDepartmentColor = (department: string) => {
    const colors = {
      'Médecine Interne': 'bg-blue-100 text-blue-800',
      'Pédiatrie': 'bg-green-100 text-green-800',
      'Chirurgie': 'bg-red-100 text-red-800',
      'Gynécologie': 'bg-purple-100 text-purple-800'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Données simulées pour le profil complet
  const profileData = {
    ...professor,
    address: '456 Avenue Mohammed V, Casablanca',
    birthDate: '1975-08-22',
    nationality: 'Marocaine',
    employeeId: 'UM6D-PROF-001',
    phone: '0661234567',
    qualifications: [
      'Doctorat en Médecine - Université Mohammed V (2005)',
      'Spécialisation en Cardiologie - CHU Ibn Sina (2008)',
      'Master en Pédagogie Médicale - Université Paris Descartes (2012)'
    ],
    schedule: [
      { day: 'Lundi', time: '09:00-11:00', course: 'Cardiologie Clinique', room: 'Amphi A' },
      { day: 'Mardi', time: '14:00-16:00', course: 'Électrocardiographie', room: 'Salle 201' },
      { day: 'Mercredi', time: '10:00-12:00', course: 'Cardiologie Clinique', room: 'Amphi B' },
      { day: 'Jeudi', time: '15:00-17:00', course: 'Séminaire Cardiologie', room: 'Salle 305' }
    ],
    students: 245,
    publications: 23,
    experience: new Date().getFullYear() - new Date(professor.hireDate).getFullYear()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Profil Professeur</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {professor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{professor.name}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDepartmentColor(professor.department)}`}>
                  {professor.department}
                </span>
              </div>
              <p className="text-gray-600 mb-1">ID Employé: {profileData.employeeId}</p>
              <p className="text-lg font-medium text-green-600 mb-3">{professor.specialty}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{professor.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    Embauché le {new Date(professor.hireDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cours enseignés</p>
                  <p className="text-xl font-bold text-blue-600">{professor.courses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Étudiants</p>
                  <p className="text-xl font-bold text-green-600">{profileData.students}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Publications</p>
                  <p className="text-xl font-bold text-purple-600">{profileData.publications}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expérience</p>
                  <p className="text-xl font-bold text-orange-600">{profileData.experience} ans</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Adresse</label>
                  <p className="text-gray-900">{profileData.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date de naissance</label>
                  <p className="text-gray-900">
                    {new Date(profileData.birthDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Nationalité</label>
                  <p className="text-gray-900">{profileData.nationality}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations académiques</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Spécialité</label>
                  <p className="text-gray-900">{professor.specialty}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Département</label>
                  <p className="text-gray-900">{professor.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date d'embauche</label>
                  <p className="text-gray-900">
                    {new Date(professor.hireDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Qualifications</h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <ul className="space-y-2">
                {profileData.qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{qualification}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Courses */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Cours enseignés</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professor.courses.map((course, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900">{course}</h5>
                  <p className="text-sm text-gray-600 mt-1">{professor.specialty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Emploi du temps</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salle
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profileData.schedule.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.day}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.course}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.room}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorProfile;
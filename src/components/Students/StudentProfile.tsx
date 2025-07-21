import React from 'react';
import { X, Mail, Phone, Calendar, BookOpen, Award, TrendingUp, User } from 'lucide-react';
import { Student } from '../../types';

interface StudentProfileProps {
  student: Student;
  onClose: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onClose }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      graduated: 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Actif',
      inactive: 'Inactif',
      graduated: 'Diplômé'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getAverageColor = (average: number) => {
    if (average >= 16) return 'text-green-600';
    if (average >= 14) return 'text-blue-600';
    if (average >= 12) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Données simulées pour le profil complet
  const profileData = {
    ...student,
    address: '123 Rue de la Paix, Rabat',
    birthDate: '1995-03-15',
    nationality: 'Marocaine',
    studentId: 'UM6D2021001',
    courses: [
      { name: 'Cardiologie Clinique', grade: 16.5, credits: 6 },
      { name: 'Pédiatrie Générale', grade: 15.2, credits: 5 },
      { name: 'Chirurgie Générale', grade: 14.8, credits: 7 },
      { name: 'Anatomie Pathologique', grade: 17.1, credits: 4 }
    ],
    attendance: 94,
    creditsEarned: 120,
    totalCredits: 180
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Profil Étudiant</h2>
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
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{student.name}</h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(student.status)}`}>
                  {getStatusLabel(student.status)}
                </span>
              </div>
              <p className="text-gray-600 mb-1">ID Étudiant: {profileData.studentId}</p>
              <p className="text-lg font-medium text-blue-600 mb-3">{student.year}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{student.phone || 'Non renseigné'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    Inscrit le {new Date(student.enrollmentDate).toLocaleDateString('fr-FR')}
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
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Moyenne générale</p>
                  <p className={`text-xl font-bold ${getAverageColor(student.average || 0)}`}>
                    {student.average?.toFixed(1) || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Présences</p>
                  <p className="text-xl font-bold text-green-600">{profileData.attendance}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crédits validés</p>
                  <p className="text-xl font-bold text-purple-600">
                    {profileData.creditsEarned}/{profileData.totalCredits}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cours suivis</p>
                  <p className="text-xl font-bold text-orange-600">{profileData.courses.length}</p>
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

            {/* Academic Progress */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Progression académique</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Crédits validés</span>
                    <span className="text-sm text-gray-900">
                      {profileData.creditsEarned}/{profileData.totalCredits}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(profileData.creditsEarned / profileData.totalCredits) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Taux de présence</span>
                    <span className="text-sm text-gray-900">{profileData.attendance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${profileData.attendance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Cours et Notes</h4>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cours
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Note
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crédits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profileData.courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getAverageColor(course.grade)}`}>
                          {course.grade.toFixed(1)}/20
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.credits}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.grade >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {course.grade >= 10 ? 'Validé' : 'Non validé'}
                        </span>
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

export default StudentProfile;
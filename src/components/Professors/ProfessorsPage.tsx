import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Book } from 'lucide-react';
import { Professor } from '../../types';
import ProfessorProfile from './ProfessorProfile';
import AddProfessorForm from './AddProfessorForm';

const ProfessorsPage: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([
    {
      id: 1,
      name: 'Dr. Hassan Alami',
      email: 'hassan.alami@um6d.ma',
      role: 'professor',
      specialty: 'Cardiologie',
      department: 'Médecine Interne',
      courses: ['Cardiologie Clinique', 'Électrocardiographie'],
      hireDate: '2018-09-01'
    },
    {
      id: 2,
      name: 'Prof. Fatima Zahra',
      email: 'fatima.zahra@um6d.ma',
      role: 'professor',
      specialty: 'Pédiatrie',
      department: 'Pédiatrie',
      courses: ['Pédiatrie Générale', 'Néonatologie'],
      hireDate: '2015-09-01'
    },
    {
      id: 3,
      name: 'Dr. Mohamed Tazi',
      email: 'mohamed.tazi@um6d.ma',
      role: 'professor',
      specialty: 'Chirurgie',
      department: 'Chirurgie',
      courses: ['Chirurgie Générale', 'Techniques Chirurgicales'],
      hireDate: '2020-09-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProfessors = professors.filter(professor => 
    professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfessor = () => {
    setShowAddForm(true);
  };

  const handleEditProfessor = (professor: Professor) => {
    setEditingProfessor(professor);
    setShowAddForm(true);
  };

  const handleDeleteProfessor = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      setProfessors(professors.filter(p => p.id !== id));
    }
  };

  const handleViewProfessor = (professor: Professor) => {
    setSelectedProfessor(professor);
  };

  const handleSaveProfessor = (professorData: Omit<Professor, 'id'>) => {
    if (editingProfessor) {
      // Update existing professor
      setProfessors(professors.map(p => 
        p.id === editingProfessor.id 
          ? { ...professorData, id: editingProfessor.id }
          : p
      ));
    } else {
      // Add new professor
      const newProfessor: Professor = {
        ...professorData,
        id: Math.max(...professors.map(p => p.id)) + 1
      };
      setProfessors([...professors, newProfessor]);
    }
    setEditingProfessor(null);
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Médecine Interne': 'bg-blue-100 text-blue-800',
      'Pédiatrie': 'bg-green-100 text-green-800',
      'Chirurgie': 'bg-red-100 text-red-800',
      'Gynécologie': 'bg-purple-100 text-purple-800'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion des Professeurs</h1>
          <p className="text-gray-600 mt-1">Gérez le corps enseignant de l'université</p>
        </div>
        <button
          onClick={handleAddProfessor}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter Professeur</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un professeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spécialité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfessors.map((professor) => (
                <tr key={professor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">
                          {professor.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{professor.name}</div>
                        <div className="text-sm text-gray-500">{professor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{professor.specialty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDepartmentColor(professor.department)}`}>
                      {professor.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Book className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {professor.courses.length} cours
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {professor.courses.slice(0, 2).join(', ')}
                      {professor.courses.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditProfessor(professor)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleViewProfessor(professor)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProfessor(professor.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProfessors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun professeur trouvé</h3>
          <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>
      )}

      {selectedProfessor && (
        <ProfessorProfile
          professor={selectedProfessor}
          onClose={() => setSelectedProfessor(null)}
        />
      )}

      {showAddForm && (
        <AddProfessorForm
          onClose={() => {
            setShowAddForm(false);
            setEditingProfessor(null);
          }}
          onSave={handleSaveProfessor}
          editingProfessor={editingProfessor}
        />
      )}
    </div>
  );
};

export default ProfessorsPage;
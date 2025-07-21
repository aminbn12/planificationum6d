import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, BookOpen, Save } from 'lucide-react';
import { Course } from '../../types';

interface AddCourseFormProps {
  onClose: () => void;
  onSave: (course: Omit<Course, 'id'>) => void;
  editingCourse?: Course | null;
  selectedTimeSlot?: { day: string; time: string; date?: string } | null;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ 
  onClose, 
  onSave, 
  editingCourse,
  selectedTimeSlot 
}) => {
  const [formData, setFormData] = useState({
    name: editingCourse?.name || '',
    professor: editingCourse?.professor || '',
    professorId: editingCourse?.professorId || 0,
    year: editingCourse?.year || '',
    day: editingCourse?.day || selectedTimeSlot?.day || '',
    time: editingCourse?.time || selectedTimeSlot?.time || '',
    duration: editingCourse?.duration || 90,
    room: editingCourse?.room || '',
    maxStudents: editingCourse?.maxStudents || 50,
    enrolledStudents: editingCourse?.enrolledStudents || 0,
    date: editingCourse?.date || selectedTimeSlot?.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for professors
  const professors = [
    { id: 1, name: 'Dr. Hassan Alami', specialty: 'Cardiologie' },
    { id: 2, name: 'Prof. Fatima Zahra', specialty: 'Pédiatrie' },
    { id: 3, name: 'Dr. Mohamed Tazi', specialty: 'Chirurgie' },
    { id: 4, name: 'Dr. Aicha Benali', specialty: 'Neurologie' },
    { id: 5, name: 'Prof. Omar Idrissi', specialty: 'Psychiatrie' }
  ];

  const rooms = [
    'Amphi A', 'Amphi B', 'Amphi C',
    'Salle 101', 'Salle 102', 'Salle 103', 'Salle 201', 'Salle 202', 'Salle 203',
    'Laboratoire 1', 'Laboratoire 2', 'Laboratoire 3',
    'Bloc Opératoire', 'Salle de simulation', 'Bibliothèque'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'maxStudents' || name === 'enrolledStudents' || name === 'professorId' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-fill professor name when professor is selected
    if (name === 'professorId') {
      const selectedProfessor = professors.find(p => p.id === parseInt(value));
      if (selectedProfessor) {
        setFormData(prev => ({
          ...prev,
          professor: selectedProfessor.name
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom du cours est requis';
    if (!formData.professorId) newErrors.professorId = 'Le professeur est requis';
    if (!formData.year) newErrors.year = 'L\'année est requise';
    if (!formData.day) newErrors.day = 'Le jour est requis';
    if (!formData.time) newErrors.time = 'L\'heure est requise';
    if (!formData.room.trim()) newErrors.room = 'La salle est requise';
    if (formData.duration < 30) newErrors.duration = 'La durée doit être d\'au moins 30 minutes';
    if (formData.maxStudents < 1) newErrors.maxStudents = 'Le nombre maximum d\'étudiants doit être supérieur à 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const courseData: Omit<Course, 'id'> = {
      name: formData.name,
      professor: formData.professor,
      professorId: formData.professorId,
      year: formData.year,
      day: formData.day,
      time: formData.time,
      duration: formData.duration,
      room: formData.room,
      maxStudents: formData.maxStudents,
      enrolledStudents: formData.enrolledStudents,
      date: formData.date
    };

    onSave(courseData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingCourse ? 'Modifier le cours' : 'Ajouter un nouveau cours'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Informations du cours */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Informations du cours
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du cours *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Cardiologie Clinique"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professeur *
                </label>
                <select
                  name="professorId"
                  value={formData.professorId}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.professorId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner un professeur</option>
                  {professors.map(professor => (
                    <option key={professor.id} value={professor.id}>
                      {professor.name} - {professor.specialty}
                    </option>
                  ))}
                </select>
                {errors.professorId && <p className="text-red-500 text-sm mt-1">{errors.professorId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année d'études *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner l'année</option>
                  <option value="1ère année">1ère année</option>
                  <option value="2ème année">2ème année</option>
                  <option value="3ème année">3ème année</option>
                  <option value="4ème année">4ème année</option>
                  <option value="5ème année">5ème année</option>
                  <option value="6ème année">6ème année</option>
                  <option value="Doctorat">Doctorat</option>
                </select>
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>
            </div>
          </div>

          {/* Planification */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Planification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date du cours *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jour *
                </label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.day ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner le jour</option>
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                </select>
                {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de début *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner l'heure</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="30"
                  step="15"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>
          </div>

          {/* Salle et capacité */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Salle et capacité
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salle *
                </label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.room ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner la salle</option>
                  {rooms.map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
                {errors.room && <p className="text-red-500 text-sm mt-1">{errors.room}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacité maximale *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    min="1"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.maxStudents ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.maxStudents && <p className="text-red-500 text-sm mt-1">{errors.maxStudents}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Étudiants inscrits
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="enrolledStudents"
                    value={formData.enrolledStudents}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.maxStudents}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{editingCourse ? 'Modifier' : 'Ajouter'} le cours</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
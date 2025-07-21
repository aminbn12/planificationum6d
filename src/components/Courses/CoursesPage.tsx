import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Users, Filter, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Course } from '../../types';
import AddCourseForm from './AddCourseForm';

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: 'Cardiologie Clinique',
      professor: 'Dr. Hassan Alami',
      professorId: 1,
      year: '4ème année',
      day: 'Lundi',
      time: '09:00',
      duration: 120,
      room: 'Amphi A',
      maxStudents: 80,
      enrolledStudents: 75,
      date: '2024-01-15' // Lundi 15 janvier 2024
    },
    {
      id: 2,
      name: 'Pédiatrie Générale',
      professor: 'Prof. Fatima Zahra',
      professorId: 2,
      year: '3ème année',
      day: 'Mardi',
      time: '14:00',
      duration: 90,
      room: 'Salle 201',
      maxStudents: 50,
      enrolledStudents: 48,
      date: '2024-01-16' // Mardi 16 janvier 2024
    },
    {
      id: 3,
      name: 'Chirurgie Générale',
      professor: 'Dr. Mohamed Tazi',
      professorId: 3,
      year: '5ème année',
      day: 'Mercredi',
      time: '10:00',
      duration: 150,
      room: 'Bloc Opératoire',
      maxStudents: 25,
      enrolledStudents: 22,
      date: '2024-01-17' // Mercredi 17 janvier 2024
    },
    {
      id: 4,
      name: 'Neurologie',
      professor: 'Dr. Aicha Benali',
      professorId: 4,
      year: '4ème année',
      day: 'Jeudi',
      time: '15:00',
      duration: 90,
      room: 'Salle 305',
      maxStudents: 40,
      enrolledStudents: 35,
      date: '2024-01-18' // Jeudi 18 janvier 2024
    },
    {
      id: 5,
      name: 'Psychiatrie',
      professor: 'Prof. Omar Idrissi',
      professorId: 5,
      year: '3ème année',
      day: 'Vendredi',
      time: '11:00',
      duration: 120,
      room: 'Salle 102',
      maxStudents: 30,
      enrolledStudents: 28,
      date: '2024-01-19' // Vendredi 19 janvier 2024
    }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [filterYear, setFilterYear] = useState('');
  const [filterProfessor, setFilterProfessor] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ day: string; time: string; date?: string } | null>(null);

  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Helper functions - moved before filteredCourses to avoid initialization errors
  const formatDateForComparison = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

  const getCurrentWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const getCurrentMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getDateRangeText = () => {
    switch (viewMode) {
      case 'day':
        return currentDate.toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'week':
        const weekStart = new Date(currentDate);
        const day = weekStart.getDay();
        const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
        weekStart.setDate(diff);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 5);
        return `${weekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${weekEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      case 'month':
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case 'year':
        return currentDate.getFullYear().toString();
      default:
        return '';
    }
  };

  // Removed duplicate and unused getCourseForSlot function

  // Removed duplicate getCourseSpan function

  // Removed duplicate isSlotOccupiedByCourse function

  // Removed duplicate getCourseAtSlot function

  // Duplicate getOccupancyColor removed

  // Removed duplicate getOccupancyText function

  const getCourseForDate = (date: Date, time?: string) => {
    const dateStr = formatDateForComparison(date);
    return filteredCourses.find(course => {
      const courseDate = formatDateForComparison(new Date(course.date));
      if (time) {
        return courseDate === dateStr && course.time === time;
      }
      return courseDate === dateStr;
    });
  };

  const filteredCourses = courses.filter(course => {
    const matchesYear = !filterYear || course.year === filterYear;
    const matchesProfessor = !filterProfessor || course.professor === filterProfessor;
    
    // Filtrer selon la vue et la date sélectionnée
    let matchesDate = true;
    const courseDate = new Date(course.date);
    
    switch (viewMode) {
      case 'day':
        matchesDate = formatDateForComparison(courseDate) === formatDateForComparison(currentDate);
        break;
      case 'week':
        const weekDays = getCurrentWeekDays();
        matchesDate = weekDays.some(day => formatDateForComparison(day) === formatDateForComparison(courseDate));
        break;
      case 'month':
        matchesDate = courseDate.getMonth() === currentDate.getMonth() && 
                     courseDate.getFullYear() === currentDate.getFullYear();
        break;
      case 'year':
        matchesDate = courseDate.getFullYear() === currentDate.getFullYear();
        break;
    }
    
    return matchesYear && matchesProfessor && matchesDate;
  });

  const getCourseForSlot = (day: string, time: string) => {
    return filteredCourses.find(course => 
      course.day === day && course.time === time
    );
  };

  const getCourseSpan = (course: Course) => {
    const startIndex = timeSlots.indexOf(course.time);
    const durationHours = Math.ceil(course.duration / 60);
    return { startIndex, span: durationHours };
  };

  const isSlotOccupiedByCourse = (day: string, time: string) => {
    return filteredCourses.some(course => {
      if (course.day !== day) return false;
      const courseStart = timeSlots.indexOf(course.time);
      const currentSlot = timeSlots.indexOf(time);
      const durationHours = Math.ceil(course.duration / 60);
      return currentSlot >= courseStart && currentSlot < courseStart + durationHours;
    });
  };

  const getCourseAtSlot = (day: string, time: string) => {
    return filteredCourses.find(course => {
      if (course.day !== day) return false;
      const courseStart = timeSlots.indexOf(course.time);
      const currentSlot = timeSlots.indexOf(time);
      const durationHours = Math.ceil(course.duration / 60);
      return currentSlot >= courseStart && currentSlot < courseStart + durationHours;
    });
  };

  const getOccupancyColor = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100;
    if (percentage >= 90) return 'bg-red-100 border-red-300';
    if (percentage >= 70) return 'bg-yellow-100 border-yellow-300';
    return 'bg-green-100 border-green-300';
  };

  const getOccupancyText = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100;
    if (percentage >= 90) return 'text-red-700';
    if (percentage >= 70) return 'text-yellow-700';
    return 'text-green-700';
  };

  const handleAddCourse = (timeSlot?: { day: string; time: string; date?: string }) => {
    setSelectedTimeSlot(timeSlot || null);
    setEditingCourse(null);
    setShowAddForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setSelectedTimeSlot(null);
    setShowAddForm(true);
  };

  const handleDeleteCourse = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleSaveCourse = (courseData: Omit<Course, 'id'>) => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...courseData, id: editingCourse.id }
          : c
      ));
    } else {
      // Add new course
      const newCourse: Course = {
        ...courseData,
        id: Math.max(...courses.map(c => c.id)) + 1
      };
      setCourses([...courses, newCourse]);
    }
    setEditingCourse(null);
    setSelectedTimeSlot(null);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const renderDayView = () => {
    const currentDateStr = formatDateForComparison(currentDate);
    
    return (
      <div className="day-view">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">
              {currentDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <div className="space-y-2">
              {timeSlots.map(time => {
                const course = filteredCourses.find(c => 
                  formatDateForComparison(new Date(c.date)) === currentDateStr && c.time === time
                );
                const isMainSlot = course && course.time === time;
                const isOccupied = filteredCourses.some(c => {
                  if (formatDateForComparison(new Date(c.date)) !== currentDateStr) return false;
                  const courseStart = timeSlots.indexOf(c.time);
                  const currentSlot = timeSlots.indexOf(time);
                  const durationHours = Math.ceil(c.duration / 60);
                  return currentSlot >= courseStart && currentSlot < courseStart + durationHours;
                });
                
                if (isOccupied && !isMainSlot) {
                  return <div key={time} className="h-16"></div>;
                }
                
                return (
                  <div key={time} className="flex items-center space-x-4 h-16 border-b border-gray-200">
                    <div className="w-16 text-sm font-medium text-gray-600">{time}</div>
                    <div className="flex-1">
                      {isMainSlot && course ? (
                        <div className={`p-3 rounded border-2 ${getOccupancyColor(course.enrolledStudents || 0, course.maxStudents || 0)} cursor-pointer hover:shadow-md transition-shadow group relative`}>
                          <div className="text-sm font-semibold text-gray-800">{course.name}</div>
                          <div className="text-xs text-gray-600">{course.professor}</div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span>{course.room}</span>
                            <span className={`${getOccupancyText(course.enrolledStudents || 0, course.maxStudents || 0)}`}>
                              {course.enrolledStudents}/{course.maxStudents}
                            </span>
                          </div>
                        </div>
                      ) : !isOccupied ? (
                        <div 
                          className="h-12 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          onClick={() => handleAddCourse({ 
                            day: dayNames[currentDate.getDay()], 
                            time,
                            date: currentDateStr 
                          })}
                        >
                          <Plus className="w-4 h-4" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getCurrentMonthDays();
    
    return (
      <div className="month-view">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {monthDays.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-24 bg-gray-50 rounded"></div>;
            }
            
            const dayDateStr = formatDateForComparison(day);
            const dayEvents = courses.filter(course => 
              formatDateForComparison(new Date(course.date)) === dayDateStr
            );
            const isToday = day.toDateString() === new Date().toDateString();
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            
            return (
              <div
                key={index}
                className={`h-24 border border-gray-200 rounded p-1 cursor-pointer hover:bg-gray-50 ${
                  isToday ? 'border-blue-500 bg-blue-50' : ''
                } ${!isCurrentMonth ? 'opacity-50' : ''}`}
                onClick={() => {
                  setCurrentDate(day);
                  setViewMode('day');
                }}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1 mt-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className="text-xs px-1 py-0.5 bg-blue-100 text-blue-800 rounded truncate"
                    >
                      {event.name}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} autres
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const currentYear = currentDate.getFullYear();
    const months = [];
    
    for (let i = 0; i < 12; i++) {
      months.push(new Date(currentYear, i, 1));
    }
    
    return (
      <div className="year-view">
        <div className="grid grid-cols-3 gap-6">
          {months.map((month, index) => {
            const monthCourses = filteredCourses.length; // Simplified for demo
            
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setCurrentDate(month);
                  setViewMode('month');
                }}
              >
                <h3 className="font-semibold text-gray-800 mb-2">
                  {monthNames[month.getMonth()]}
                </h3>
                <div className="text-sm text-gray-600">
                  {monthCourses} cours programmés
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPlanningGrid = () => {
    switch (viewMode) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      case 'year':
        return renderYearView();
      default:
        return renderWeekView();
    }
  };

  const renderWeekView = () => {
    const weekDaysWithDates = getCurrentWeekDays();
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {/* Time slots column */}
        <div className="lg:col-span-1">
          <div className="h-12 flex items-center justify-center font-semibold text-gray-700">
            Horaires
          </div>
          {timeSlots.map(time => (
            <div key={time} className="h-16 flex items-center justify-center text-sm font-medium text-gray-600 border-b">
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDaysWithDates.map((dayDate, dayIndex) => {
          const dayName = weekDays[dayIndex];
          const isToday = dayDate.toDateString() === new Date().toDateString();
          const dayDateStr = formatDateForComparison(dayDate);
          
          return (
            <div key={dayName} className="lg:col-span-1">
              <div className={`h-12 flex flex-col items-center justify-center font-semibold rounded-t-lg ${
                isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-700'
              }`}>
                <div className="text-sm">{dayName}</div>
                <div className="text-xs">{dayDate.getDate()}</div>
              </div>
              {timeSlots.map(time => {
                const course = filteredCourses.find(c => 
                  formatDateForComparison(new Date(c.date)) === dayDateStr && c.time === time
                );
                const isMainSlot = course && course.time === time;
                const isOccupied = filteredCourses.some(c => {
                  if (formatDateForComparison(new Date(c.date)) !== dayDateStr) return false;
                  const courseStart = timeSlots.indexOf(c.time);
                  const currentSlot = timeSlots.indexOf(time);
                  const durationHours = Math.ceil(c.duration / 60);
                  return currentSlot >= courseStart && currentSlot < courseStart + durationHours;
                });
                
                if (isOccupied && !isMainSlot) {
                  // This slot is part of a longer course but not the main slot
                  return (
                    <div key={`${dayName}-${time}`} className="h-16 border-b border-gray-200">
                      {/* Empty div for continuation of course */}
                    </div>
                  );
                }
                
                return (
                  <div key={`${dayName}-${time}`} className="h-16 border-b border-gray-200 p-1">
                    {isMainSlot && course ? (
                      <div 
                        className={`p-2 rounded border-2 ${getOccupancyColor(course.enrolledStudents || 0, course.maxStudents || 0)} cursor-pointer hover:shadow-md transition-shadow group relative`}
                        style={{ 
                          height: `${getCourseSpan(course).span * 64 - 4}px`,
                          zIndex: 10
                        }}
                      >
                        <div className="text-xs font-semibold text-gray-800 truncate">
                          {course.name}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {course.professor}
                        </div>
                        <div className="flex items-center justify-between text-xs mt-2">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {course.room}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-gray-500">
                            {course.time} - {timeSlots[timeSlots.indexOf(course.time) + getCourseSpan(course).span] || '19:00'}
                          </span>
                          <span className={`${getOccupancyText(course.enrolledStudents || 0, course.maxStudents || 0)}`}>
                            {course.enrolledStudents}/{course.maxStudents}
                          </span>
                        </div>
                        {/* Action buttons on hover */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCourse(course);
                            }}
                            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(course.id);
                            }}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : !isOccupied ? (
                      <div 
                        className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        onClick={() => handleAddCourse({ 
                          day: dayName, 
                          time,
                          date: dayDateStr 
                        })}
                      >
                        <Plus className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="h-full">
                        {/* Empty space for course continuation */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Planification des Cours</h1>
          <p className="text-gray-600 mt-1">Organisez les cours et gérez les emplois du temps</p>
        </div>
        <button
          onClick={() => handleAddCourse()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Ajouter Cours</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="flex flex-col space-y-4">
            {/* Navigation et vue */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateDate('prev')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="min-w-[200px] text-center">
                  <h3 className="font-semibold text-gray-800">{getDateRangeText()}</h3>
                </div>
                <button
                  onClick={() => navigateDate('next')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Aujourd'hui
              </button>

              {/* Sélecteur de vue */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['day', 'week', 'month', 'year'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      viewMode === mode
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {mode === 'day' && 'Jour'}
                    {mode === 'week' && 'Semaine'}
                    {mode === 'month' && 'Mois'}
                    {mode === 'year' && 'Année'}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Filtres */}
              <div className="flex space-x-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les années</option>
                    <option value="1ère année">1ère année</option>
                    <option value="2ème année">2ème année</option>
                    <option value="3ème année">3ème année</option>
                    <option value="4ème année">4ème année</option>
                    <option value="5ème année">5ème année</option>
                    <option value="6ème année">6ème année</option>
                  </select>
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    value={filterProfessor}
                    onChange={(e) => setFilterProfessor(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les professeurs</option>
                    <option value="Dr. Hassan Alami">Dr. Hassan Alami</option>
                    <option value="Prof. Fatima Zahra">Prof. Fatima Zahra</option>
                    <option value="Dr. Mohamed Tazi">Dr. Mohamed Tazi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderPlanningGrid()}
        </div>
      </div>

      {showAddForm && (
        <AddCourseForm
          onClose={() => {
            setShowAddForm(false);
            setEditingCourse(null);
            setSelectedTimeSlot(null);
          }}
          onSave={handleSaveCourse}
          editingCourse={editingCourse}
          selectedTimeSlot={selectedTimeSlot}
        />
      )}

      {/* Course List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Liste des Cours</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredCourses.map(course => (
            <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {course.year}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{course.professor}</p>
                  <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{course.day}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.time} ({course.duration}min)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{course.room}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledStudents}/{course.maxStudents}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                    Modifier
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
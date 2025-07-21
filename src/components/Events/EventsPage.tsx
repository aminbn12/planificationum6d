import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Edit, Trash2 } from 'lucide-react';
import { Event } from '../../types';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Réunion pédagogique',
      description: 'Réunion mensuelle du conseil pédagogique',
      date: '2024-01-15',
      time: '14:00',
      location: 'Salle de conférence',
      type: 'meeting',
      organizer: 'Dr. Ahmed Ben Ali'
    },
    {
      id: 2,
      title: 'Examens finaux',
      description: 'Session d\'examens de fin de semestre',
      date: '2024-01-20',
      time: '08:00',
      location: 'Toutes les salles',
      type: 'exam',
      organizer: 'Administration'
    },
    {
      id: 3,
      title: 'Conférence médicale',
      description: 'Conférence sur les nouvelles technologies médicales',
      date: '2024-02-10',
      time: '15:00',
      location: 'Amphithéâtre principal',
      type: 'conference',
      organizer: 'Prof. Sarah Martin'
    }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const generateCalendar = () => {
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
      days.push(day);
    }

    return days;
  };

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800',
      exam: 'bg-red-100 text-red-800',
      conference: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getEventTypeLabel = (type: string) => {
    const labels = {
      meeting: 'Réunion',
      exam: 'Examen',
      conference: 'Conférence',
      other: 'Autre'
    };
    return labels[type as keyof typeof labels] || 'Autre';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Événements Universitaires</h1>
          <p className="text-gray-600 mt-1">Gérez les événements et activités de l'université</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Ajouter Événement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map((day, index) => {
                  const dayEvents = day ? getEventsForDate(day) : [];
                  const isToday = day === new Date().getDate() && 
                                 currentDate.getMonth() === new Date().getMonth() && 
                                 currentDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <div
                      key={index}
                      className={`h-20 border border-gray-200 rounded-lg p-1 ${
                        day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                      } ${isToday ? 'border-blue-500 bg-blue-50' : ''}`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)} cursor-pointer`}
                                onClick={() => setSelectedEvent(event)}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayEvents.length - 2} autres
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Événements à venir</h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                      {getEventTypeLabel(event.type)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedEvent && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Détails de l'événement</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{selectedEvent.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedEvent.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Edit className="w-4 h-4" />
                      <span>Modifier</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
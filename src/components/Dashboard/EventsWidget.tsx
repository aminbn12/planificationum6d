import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const EventsWidget: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Réunion pédagogique',
      date: '15 Jan',
      time: '14:00',
      location: 'Salle de conférence'
    },
    {
      id: 2,
      title: 'Examens finaux',
      date: '20 Jan',
      time: '08:00',
      location: 'Toutes les salles'
    },
    {
      id: 3,
      title: 'Soutenances de thèse',
      date: '25 Jan',
      time: '10:00',
      location: 'Amphithéâtre'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Événements à venir</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{event.date}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        Voir tous les événements
      </button>
    </div>
  );
};

export default EventsWidget;
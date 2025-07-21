import React, { useState } from 'react';
import { Plus, FileText, Clock, Printer, CheckCircle, Download } from 'lucide-react';
import { Certificate } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const CertificatesPage: React.FC = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      studentId: 3,
      studentName: 'Marie Dupont',
      type: 'inscription',
      status: 'pending',
      requestDate: '2024-01-10',
      reason: 'Demande de bourse',
      copies: 2
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Ahmed Ben Ali',
      type: 'reussite',
      status: 'processing',
      requestDate: '2024-01-08',
      reason: 'Candidature master',
      copies: 1
    },
    {
      id: 3,
      studentId: 1,
      studentName: 'Sarah Martin',
      type: 'notes',
      status: 'ready',
      requestDate: '2024-01-05',
      completionDate: '2024-01-12',
      reason: 'Transfert universitaire',
      copies: 3
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: '',
    reason: '',
    copies: 1
  });

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-5 h-5 text-yellow-500" />,
      processing: <Printer className="w-5 h-5 text-blue-500" />,
      ready: <CheckCircle className="w-5 h-5 text-green-500" />,
      delivered: <Download className="w-5 h-5 text-gray-500" />
    };
    return icons[status as keyof typeof icons];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'En attente',
      processing: 'En traitement',
      ready: 'Prête',
      delivered: 'Livrée'
    };
    return labels[status as keyof typeof labels];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      inscription: 'Attestation d\'inscription',
      reussite: 'Attestation de réussite',
      notes: 'Relevé de notes',
      stage: 'Attestation de stage'
    };
    return labels[type as keyof typeof labels];
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCertificate: Certificate = {
      id: certificates.length + 1,
      studentId: user?.id || 0,
      studentName: user?.name || '',
      type: newRequest.type as 'inscription' | 'reussite' | 'notes' | 'stage',
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      reason: newRequest.reason,
      copies: newRequest.copies
    };

    setCertificates([...certificates, newCertificate]);
    setNewRequest({ type: '', reason: '', copies: 1 });
    setIsModalOpen(false);
  };

  const updateCertificateStatus = (id: number, newStatus: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id 
        ? { ...cert, status: newStatus as 'pending' | 'processing' | 'ready' | 'delivered' }
        : cert
    ));
  };

  const filteredCertificates = user?.role === 'student' 
    ? certificates.filter(cert => cert.studentId === user.id)
    : certificates;

  const groupedCertificates = {
    pending: filteredCertificates.filter(cert => cert.status === 'pending'),
    processing: filteredCertificates.filter(cert => cert.status === 'processing'),
    ready: filteredCertificates.filter(cert => cert.status === 'ready'),
    delivered: filteredCertificates.filter(cert => cert.status === 'delivered')
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user?.role === 'student' ? 'Mes Demandes d\'Attestations' : 'Gestion des Attestations'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' 
              ? 'Suivez vos demandes d\'attestations et documents'
              : 'Gérez les demandes d\'attestations des étudiants'
            }
          </p>
        </div>
        {user?.role === 'student' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle Demande</span>
          </button>
        )}
      </div>

      {user?.role === 'admin' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(groupedCertificates).map(([status, certs]) => (
            <div key={status} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(status)}
                  <h3 className="font-semibold text-gray-800">{getStatusLabel(status)}</h3>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                    {certs.length}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {certs.map(cert => (
                  <div key={cert.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{cert.studentName}</h4>
                        <p className="text-sm text-gray-600">{getTypeLabel(cert.type)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Demandé le {new Date(cert.requestDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {status === 'pending' && (
                          <button
                            onClick={() => updateCertificateStatus(cert.id, 'processing')}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Traiter
                          </button>
                        )}
                        {status === 'processing' && (
                          <button
                            onClick={() => updateCertificateStatus(cert.id, 'ready')}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Terminer
                          </button>
                        )}
                        {status === 'ready' && (
                          <button
                            onClick={() => updateCertificateStatus(cert.id, 'delivered')}
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                          >
                            Livrer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {certs.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune demande</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Mes Demandes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredCertificates.map(cert => (
              <div key={cert.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{getTypeLabel(cert.type)}</h3>
                        <p className="text-sm text-gray-600">{cert.reason}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
                      <span>Demandé le {new Date(cert.requestDate).toLocaleDateString('fr-FR')}</span>
                      <span>{cert.copies} exemplaire(s)</span>
                      {cert.completionDate && (
                        <span>Terminé le {new Date(cert.completionDate).toLocaleDateString('fr-FR')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(cert.status)}`}>
                      {getStatusLabel(cert.status)}
                    </span>
                    {cert.status === 'ready' && (
                      <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Download className="w-4 h-4" />
                        <span>Télécharger</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Nouvelle Demande d'Attestation</h2>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'attestation
                </label>
                <select
                  value={newRequest.type}
                  onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner le type</option>
                  <option value="inscription">Attestation d'inscription</option>
                  <option value="reussite">Attestation de réussite</option>
                  <option value="notes">Relevé de notes</option>
                  <option value="stage">Attestation de stage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motif de la demande
                </label>
                <textarea
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Précisez le motif de votre demande..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'exemplaires
                </label>
                <select
                  value={newRequest.copies}
                  onChange={(e) => setNewRequest({...newRequest, copies: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>1 exemplaire</option>
                  <option value={2}>2 exemplaires</option>
                  <option value={3}>3 exemplaires</option>
                </select>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Envoyer la demande
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
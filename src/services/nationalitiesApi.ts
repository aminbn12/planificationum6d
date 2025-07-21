// Service pour récupérer les nationalités depuis une API
export interface Nationality {
  code: string;
  name: string;
  demonym: string;
}

import { nationalitiesAPI } from './api';

export const fetchNationalities = async (): Promise<Nationality[]> => {
  try {
    return await nationalitiesAPI.getAll();
  } catch (error) {
    console.error('Erreur lors de la récupération des nationalités:', error);
    
    // Fallback avec quelques nationalités communes
    return [
      { code: 'MA', name: 'Maroc', demonym: 'Marocaine' },
      { code: 'FR', name: 'France', demonym: 'Française' },
      { code: 'DZ', name: 'Algérie', demonym: 'Algérienne' },
      { code: 'TN', name: 'Tunisie', demonym: 'Tunisienne' },
      { code: 'EG', name: 'Égypte', demonym: 'Égyptienne' },
      { code: 'SA', name: 'Arabie Saoudite', demonym: 'Saoudienne' },
      { code: 'ES', name: 'Espagne', demonym: 'Espagnole' },
      { code: 'IT', name: 'Italie', demonym: 'Italienne' },
      { code: 'DE', name: 'Allemagne', demonym: 'Allemande' },
      { code: 'GB', name: 'Royaume-Uni', demonym: 'Britannique' },
      { code: 'US', name: 'États-Unis', demonym: 'Américaine' },
      { code: 'CA', name: 'Canada', demonym: 'Canadienne' }
    ].sort((a, b) => a.demonym.localeCompare(b.demonym));
  }
};

// Hook personnalisé pour utiliser les nationalités
export const useNationalities = () => {
  const [nationalities, setNationalities] = React.useState<Nationality[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadNationalities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNationalities();
        setNationalities(data);
      } catch (err) {
        setError('Erreur lors du chargement des nationalités');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNationalities();
  }, []);

  return { nationalities, loading, error };
};

// Import React pour le hook
import React from 'react';
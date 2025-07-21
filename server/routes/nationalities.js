const express = require('express');
const axios = require('axios');

const router = express.Router();

// Cache for nationalities to avoid repeated API calls
let nationalitiesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Fallback nationalities in case API fails
const fallbackNationalities = [
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
  { code: 'CA', name: 'Canada', demonym: 'Canadienne' },
  { code: 'JP', name: 'Japon', demonym: 'Japonaise' },
  { code: 'CN', name: 'Chine', demonym: 'Chinoise' },
  { code: 'IN', name: 'Inde', demonym: 'Indienne' },
  { code: 'BR', name: 'Brésil', demonym: 'Brésilienne' },
  { code: 'MX', name: 'Mexique', demonym: 'Mexicaine' },
  { code: 'AU', name: 'Australie', demonym: 'Australienne' },
  { code: 'RU', name: 'Russie', demonym: 'Russe' },
  { code: 'ZA', name: 'Afrique du Sud', demonym: 'Sud-africaine' }
].sort((a, b) => a.demonym.localeCompare(b.demonym));

const fetchNationalitiesFromAPI = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,demonyms,cca2', {
      timeout: 10000 // 10 seconds timeout
    });
    
    const countries = response.data;
    
    const nationalities = countries
      .map(country => {
        // Get country name in French or English
        const name = country.name?.nativeName?.fra?.common || 
                    country.name?.common || 
                    'Inconnu';
        
        // Get demonym in French or English
        const demonym = country.demonyms?.fra?.m || 
                       country.demonyms?.eng?.m || 
                       name;
        
        return {
          code: country.cca2,
          name: name,
          demonym: demonym
        };
      })
      .filter(nationality => nationality.demonym !== 'Inconnu' && nationality.demonym !== nationality.name)
      .sort((a, b) => a.demonym.localeCompare(b.demonym));
    
    return nationalities;
  } catch (error) {
    console.error('Error fetching nationalities from API:', error.message);
    throw error;
  }
};

// Get all nationalities
router.get('/', async (req, res) => {
  try {
    // Check if cache is valid
    const now = Date.now();
    if (nationalitiesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return res.json(nationalitiesCache);
    }
    
    // Try to fetch from API
    try {
      const nationalities = await fetchNationalitiesFromAPI();
      
      // Update cache
      nationalitiesCache = nationalities;
      cacheTimestamp = now;
      
      res.json(nationalities);
    } catch (apiError) {
      // Fallback to predefined list
      console.warn('Using fallback nationalities due to API error:', apiError.message);
      
      // Cache fallback data for shorter duration
      nationalitiesCache = fallbackNationalities;
      cacheTimestamp = now - (CACHE_DURATION - 60000); // Cache for 1 minute only
      
      res.json(fallbackNationalities);
    }
  } catch (error) {
    console.error('Error in nationalities endpoint:', error);
    res.status(500).json({ 
      message: 'Error fetching nationalities',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Get nationality by code
router.get('/:code', async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    
    // Ensure we have nationalities data
    if (!nationalitiesCache) {
      try {
        nationalitiesCache = await fetchNationalitiesFromAPI();
        cacheTimestamp = Date.now();
      } catch (error) {
        nationalitiesCache = fallbackNationalities;
        cacheTimestamp = Date.now();
      }
    }
    
    const nationality = nationalitiesCache.find(n => n.code === code);
    
    if (!nationality) {
      return res.status(404).json({ message: 'Nationality not found' });
    }
    
    res.json(nationality);
  } catch (error) {
    console.error('Error fetching nationality by code:', error);
    res.status(500).json({ 
      message: 'Error fetching nationality',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Search nationalities
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    
    // Ensure we have nationalities data
    if (!nationalitiesCache) {
      try {
        nationalitiesCache = await fetchNationalitiesFromAPI();
        cacheTimestamp = Date.now();
      } catch (error) {
        nationalitiesCache = fallbackNationalities;
        cacheTimestamp = Date.now();
      }
    }
    
    const results = nationalitiesCache.filter(nationality =>
      nationality.name.toLowerCase().includes(query) ||
      nationality.demonym.toLowerCase().includes(query) ||
      nationality.code.toLowerCase().includes(query)
    );
    
    res.json(results);
  } catch (error) {
    console.error('Error searching nationalities:', error);
    res.status(500).json({ 
      message: 'Error searching nationalities',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Clear cache (admin only)
router.delete('/cache', (req, res) => {
  nationalitiesCache = null;
  cacheTimestamp = null;
  res.json({ message: 'Nationalities cache cleared successfully' });
});

module.exports = router;
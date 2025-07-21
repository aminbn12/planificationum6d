# Système de Gestion Universitaire UM6D

Application complète de gestion universitaire avec React, TypeScript, Node.js et MongoDB Atlas.

## 🚀 Configuration rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données
Le fichier `.env` est déjà configuré avec votre MongoDB Atlas.

### 3. Test de connexion
```bash
# Tester la connexion à MongoDB Atlas
npm run db:test
```

### 4. Initialisation des données
```bash
# Créer des données de test
npm run seed
```

### 5. Démarrage de l'application
```bash
# Démarrer frontend + backend
npm run dev:full

# Ou séparément:
npm run server:dev  # Backend seulement
npm run dev         # Frontend seulement
```

## 👥 Comptes de test

Après avoir exécuté `npm run seed`, vous aurez accès à :

- **Administrateur**: `admin@um6d.ma` / `admin123`
- **Professeur**: `prof@um6d.ma` / `prof123`
- **Étudiant**: `student@um6d.ma` / `student123`

## 🗄️ Base de données

### Collections MongoDB créées automatiquement :
- `users` - Utilisateurs (admin, professeurs, étudiants)
- `students` - Profils détaillés des étudiants
- `professors` - Profils détaillés des professeurs
- `courses` - Planification des cours
- `events` - Événements universitaires
- `certificates` - Demandes d'attestations

### Commandes utiles :
```bash
npm run db:test    # Tester la connexion
npm run db:check   # Vérifier l'état de la DB
npm run seed       # Créer des données de test
```

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📱 Fonctionnalités

### Pour les Administrateurs
- Gestion des étudiants et professeurs
- Planification des cours
- Validation des attestations
- Gestion des événements
- Statistiques et rapports

### Pour les Professeurs
- Consultation des étudiants
- Gestion de leurs cours
- Création d'événements

### Pour les Étudiants
- Consultation de leur profil
- Demande d'attestations
- Consultation des cours et événements

## 🔧 Scripts disponibles

```bash
npm run dev:full     # Frontend + Backend
npm run dev          # Frontend seulement
npm run server:dev   # Backend seulement
npm run build        # Build production
npm run seed         # Données de test
npm run db:test      # Test connexion DB
npm run db:check     # État de la DB
```

## 🛠️ Technologies utilisées

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose
- **Authentification**: JWT
- **Sécurité**: Helmet, Rate Limiting, CORS
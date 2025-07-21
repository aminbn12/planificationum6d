# Structure de la Base de Données MongoDB

## Collections créées automatiquement

### 1. Collection `users`
```javascript
{
  _id: ObjectId,
  name: "Dr. Ahmed Ben Ali",
  email: "admin@um6d.ma", 
  password: "hash_bcrypt",
  role: "admin|professor|student",
  avatar: "url_optionnel",
  isActive: true,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Collection `students` 
```javascript
{
  _id: ObjectId,
  user: ObjectId, // Référence vers users
  studentId: "UM6D2024001",
  year: "3ème année",
  average: 15.2,
  status: "active|inactive|graduated",
  phone: "0612345678",
  address: "123 Rue de la Paix, Rabat",
  birthDate: Date,
  nationality: "Marocaine",
  enrollmentDate: Date,
  emergencyContact: {
    name: "Contact urgence",
    phone: "0612345678"
  },
  previousEducation: "Baccalauréat Sciences",
  specialization: "Médecine générale",
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Collection `professors`
```javascript
{
  _id: ObjectId,
  user: ObjectId, // Référence vers users
  employeeId: "UM6D-PROF-001",
  specialty: "Cardiologie",
  department: "Médecine Interne",
  courses: ["Cardiologie Clinique", "ECG"],
  hireDate: Date,
  phone: "0661234567",
  address: "456 Avenue Mohammed V",
  birthDate: Date,
  nationality: "Marocaine",
  qualifications: ["Doctorat Médecine", "Spécialisation"],
  experience: "8 ans d'expérience",
  publications: "23 publications",
  researchInterests: "Cardiologie interventionnelle",
  officeLocation: "Bâtiment A, Bureau 201",
  officeHours: "Lundi-Vendredi 9h-17h",
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Collection `courses`
```javascript
{
  _id: ObjectId,
  name: "Cardiologie Clinique",
  professor: ObjectId, // Référence vers professors
  year: "4ème année",
  day: "Lundi",
  time: "09:00",
  duration: 120, // minutes
  room: "Amphi A",
  maxStudents: 80,
  enrolledStudents: [ObjectId], // Références vers students
  date: Date, // Date spécifique du cours
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Collection `events`
```javascript
{
  _id: ObjectId,
  title: "Réunion pédagogique",
  description: "Réunion mensuelle du conseil",
  date: Date,
  time: "14:00",
  location: "Salle de conférence",
  type: "meeting|exam|conference|other",
  organizer: ObjectId, // Référence vers users
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Collection `certificates`
```javascript
{
  _id: ObjectId,
  student: ObjectId, // Référence vers students
  type: "inscription|reussite|notes|stage",
  status: "pending|processing|ready|delivered",
  reason: "Demande de bourse",
  copies: 2,
  requestDate: Date,
  completionDate: Date, // Optionnel
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 Relations entre collections

- **users** ↔ **students** (1:1) via `user` field
- **users** ↔ **professors** (1:1) via `user` field  
- **professors** ↔ **courses** (1:N) via `professor` field
- **students** ↔ **courses** (N:N) via `enrolledStudents` array
- **students** ↔ **certificates** (1:N) via `student` field
- **users** ↔ **events** (1:N) via `organizer` field

## 🚀 Création automatique

Les collections sont créées automatiquement quand :
1. Premier utilisateur s'inscrit → Collection `users`
2. Premier étudiant ajouté → Collections `users` + `students`
3. Premier cours créé → Collection `courses`
4. Etc...

## 📝 Index automatiques

Mongoose crée automatiquement des index pour :
- `_id` (unique) sur toutes les collections
- `email` (unique) sur users
- `studentId` (unique) sur students  
- `employeeId` (unique) sur professors
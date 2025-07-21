export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'professor' | 'student';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  year: string;
  average?: number;
  status: 'active' | 'inactive' | 'graduated';
  phone?: string;
  enrollmentDate: string;
}

export interface Professor extends User {
  role: 'professor';
  specialty: string;
  department: string;
  courses: string[];
  hireDate: string;
}

export interface Course {
  id: number;
  name: string;
  professor: string;
  professorId: number;
  year: string;
  day: string;
  time: string;
  duration: number;
  room?: string;
  maxStudents?: number;
  enrolledStudents?: number;
  date: string; // Format YYYY-MM-DD
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer?: string;
  type: 'meeting' | 'exam' | 'conference' | 'other';
}

export interface Certificate {
  id: number;
  studentId: number;
  studentName: string;
  type: 'inscription' | 'reussite' | 'notes' | 'stage';
  status: 'pending' | 'processing' | 'ready' | 'delivered';
  requestDate: string;
  completionDate?: string;
  reason?: string;
  copies: number;
}

export interface Stats {
  totalStudents: number;
  totalProfessors: number;
  totalCourses: number;
  pendingCertificates: number;
  activeEvents: number;
}
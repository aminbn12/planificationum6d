const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth token management
let authToken: string | null = localStorage.getItem('authToken');

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => authToken;

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  register: async (userData: { name: string; email: string; password: string; role?: string }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  logout: () => {
    setAuthToken(null);
  },
};

// Students API
export const studentsAPI = {
  getAll: async (params?: { year?: string; status?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return await apiRequest(`/students${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return await apiRequest(`/students/${id}`);
  },

  create: async (studentData: any) => {
    return await apiRequest('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  },

  update: async (id: number, studentData: any) => {
    return await apiRequest(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/students/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return await apiRequest('/students/stats/overview');
  },
};

// Professors API
export const professorsAPI = {
  getAll: async (params?: { department?: string; specialty?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.department) queryParams.append('department', params.department);
    if (params?.specialty) queryParams.append('specialty', params.specialty);
    if (params?.search) queryParams.append('search', params.search);
    
    const query = queryParams.toString();
    return await apiRequest(`/professors${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return await apiRequest(`/professors/${id}`);
  },

  create: async (professorData: any) => {
    return await apiRequest('/professors', {
      method: 'POST',
      body: JSON.stringify(professorData),
    });
  },

  update: async (id: number, professorData: any) => {
    return await apiRequest(`/professors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(professorData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/professors/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return await apiRequest('/professors/stats/overview');
  },
};

// Courses API
export const coursesAPI = {
  getAll: async (params?: { year?: string; professor?: string; day?: string; startDate?: string; endDate?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.year) queryParams.append('year', params.year);
    if (params?.professor) queryParams.append('professor', params.professor);
    if (params?.day) queryParams.append('day', params.day);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    
    const query = queryParams.toString();
    return await apiRequest(`/courses${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return await apiRequest(`/courses/${id}`);
  },

  create: async (courseData: any) => {
    return await apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  update: async (id: number, courseData: any) => {
    return await apiRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    });
  },

  enroll: async (courseId: number, studentId: number) => {
    return await apiRequest(`/courses/${courseId}/enroll`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  },

  getStats: async () => {
    return await apiRequest('/courses/stats/overview');
  },
};

// Events API
export const eventsAPI = {
  getAll: async (params?: { type?: string; startDate?: string; endDate?: string; organizer?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.organizer) queryParams.append('organizer', params.organizer);
    
    const query = queryParams.toString();
    return await apiRequest(`/events${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return await apiRequest(`/events/${id}`);
  },

  create: async (eventData: any) => {
    return await apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: async (id: number, eventData: any) => {
    return await apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/events/${id}`, {
      method: 'DELETE',
    });
  },

  getUpcoming: async () => {
    return await apiRequest('/events/upcoming/list');
  },
};

// Certificates API
export const certificatesAPI = {
  getAll: async (params?: { status?: string; type?: string; studentId?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.studentId) queryParams.append('studentId', params.studentId.toString());
    
    const query = queryParams.toString();
    return await apiRequest(`/certificates${query ? `?${query}` : ''}`);
  },

  getById: async (id: number) => {
    return await apiRequest(`/certificates/${id}`);
  },

  create: async (certificateData: { type: string; reason: string; copies?: number }) => {
    return await apiRequest('/certificates', {
      method: 'POST',
      body: JSON.stringify(certificateData),
    });
  },

  updateStatus: async (id: number, status: string) => {
    return await apiRequest(`/certificates/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/certificates/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return await apiRequest('/certificates/stats/overview');
  },
};

// Nationalities API
export const nationalitiesAPI = {
  getAll: async () => {
    return await apiRequest('/nationalities');
  },

  getByCode: async (code: string) => {
    return await apiRequest(`/nationalities/${code}`);
  },

  search: async (query: string) => {
    return await apiRequest(`/nationalities/search/${query}`);
  },
};
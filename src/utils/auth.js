// Authentication utility functions
const getBaseURL = () => process.env.REACT_APP_BASE_URL || 'http://localhost:1337';

// Mock mode for development when backend is not available
const MOCK_MODE = process.env.REACT_APP_MOCK_AUTH === 'true';

console.log('auth.js loaded successfully');
console.log('Mock mode:', MOCK_MODE);
console.log('Base URL:', getBaseURL());

// User management functions
export const getUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

export const setUser = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const authAPI = {
  signup: async (userData) => {
    // Mock mode for development
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return {
        user: {
          id: 1,
          email: userData.email,
          name: userData.name || 'Test User',
          role: 'teacher'
        },
        token: 'mock-jwt-token-' + Date.now()
      };
    }

    try {
      const response = await fetch(`${getBaseURL()}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.message || 'Signup failed');
        } else {
          // If it's not JSON, it might be HTML (like a 404 page)
          const text = await response.text();
          if (response.status === 404) {
            throw new Error('Backend server not found. Please ensure the backend server is running on http://localhost:1337');
          } else {
            throw new Error(`Server error: ${response.status} - ${text.substring(0, 100)}`);
          }
        }
      }
      
      return response.json();
    } catch (error) {
      // Network error (server not running)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please ensure the backend server is running on http://localhost:1337');
      }
      throw error;
    }
  },

  login: async (credentials) => {
    // Mock mode for development
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Simple mock validation
      if (credentials.email === 'admin@test.com' && credentials.password === 'password') {
        return {
          user: {
            id: 1,
            email: credentials.email,
            name: 'Admin User',
            role: 'teacher'
          },
          token: 'mock-jwt-token-' + Date.now()
        };
      } else {
        throw new Error('Invalid credentials. Use admin@test.com / password for testing');
      }
    }

    try {
      const response = await fetch(`${getBaseURL()}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        } else {
          // If it's not JSON, it might be HTML (like a 404 page)
          const text = await response.text();
          if (response.status === 404) {
            throw new Error('Backend server not found. Please ensure the backend server is running on http://localhost:1337');
          } else {
            throw new Error(`Server error: ${response.status} - ${text.substring(0, 100)}`);
          }
        }
      }
      
      const data = await response.json();
      
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
      }
      
      return data;
    } catch (error) {
      // Network error (server not running)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Please ensure the backend server is running on http://localhost:1337');
      }
      throw error;
    }
  },

  logout: async () => {
    const token = getToken();
    
    if (token) {
      try {
        await fetch(`${getBaseURL()}/api/v1/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }
    
    clearAuth();
  },
};

export const apiClient = {
  get: async (url, options = {}) => {
    const token = getToken();
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearAuth();
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  post: async (url, data = null, options = {}) => {
    const token = getToken();
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...(data && { body: JSON.stringify(data) }),
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearAuth();
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  put: async (url, data = null, options = {}) => {
    const token = getToken();
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...(data && { body: JSON.stringify(data) }),
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearAuth();
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  delete: async (url, options = {}) => {
    const token = getToken();
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearAuth();
        window.location.href = '/signin';
        return;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

// Authentication utility functions
const getBaseURL = () => process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_BASE_URL || '');

console.log('auth.js loaded successfully');

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
    const response = await fetch(`${getBaseURL()}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${getBaseURL()}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    
    if (data.token) {
      setToken(data.token);
      setUser(data.user);
    }
    
    return data;
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

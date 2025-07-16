import { useState, useEffect } from 'react';
import { message } from 'antd';
import { getToken } from '../utils/auth';

export const useClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Use proxy in development, full URL in production
      const baseURL = process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_BASE_URL || '');
      const response = await fetch(`${baseURL}/api/v1/classes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch classes');
      }

      const data = await response.json();
      setClasses(data.classes || []);
    } catch (err) {
      setError(err.message);
      message.error(`Error loading classes: ${err.message}`);
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const refetch = () => {
    fetchClasses();
  };

  return {
    classes,
    loading,
    error,
    refetch,
  };
};

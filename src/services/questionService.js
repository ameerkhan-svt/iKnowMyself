import { getToken } from '../utils/auth';

const getBaseURL = () => process.env.NODE_ENV === 'development' ? '' : (process.env.REACT_APP_BASE_URL || '');

export const questionService = {
  // Create a new question
  createQuestion: async (questionData) => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${getBaseURL()}/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create question');
    }

    const data = await response.json();
    return data.question;
  },

  // Get all questions
  getQuestions: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${getBaseURL()}/api/v1/questions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch questions');
    }

    const data = await response.json();
    return data; // Return the full response object so hook can access data.questions
  },

  // Get a single question by ID
  getQuestion: async (questionId) => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${getBaseURL()}/api/v1/questions/${questionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch question');
    }

    const data = await response.json();
    return data.question;
  },

  // Update a question
  updateQuestion: async (questionId, questionData) => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${getBaseURL()}/api/v1/questions/${questionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update question');
    }

    const data = await response.json();
    return data.question;
  },

  // Delete a question
  deleteQuestion: async (questionId) => {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${getBaseURL()}/api/v1/questions/${questionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete question');
    }

    const data = await response.json();
    return data.question;
  },
};

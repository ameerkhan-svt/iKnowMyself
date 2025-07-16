import { useState, useEffect, useCallback, useRef } from 'react';
import { questionService } from '../services/questionService';

export const useQuestions = (initialParams = {}) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Use ref to store initialParams to avoid recreating fetchQuestions
  const initialParamsRef = useRef(initialParams);
  initialParamsRef.current = initialParams;

  const fetchQuestions = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await questionService.getQuestions({
        ...initialParamsRef.current,
        ...params,
      });
      
      console.log('API Response:', response); // Debug log
      
      // Handle the response structure from your API
      if (response && response.questions) {
        console.log('Questions found:', response.questions.length); // Debug log
        setQuestions(response.questions);
        // If API provides pagination info, update it
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            ...response.pagination,
          }));
        } else {
          // Update total count if available
          setPagination(prev => ({
            ...prev,
            total: response.questions.length,
          }));
        }
      } else if (Array.isArray(response)) {
        // Fallback: if response is directly an array of questions
        console.log('Questions array found:', response.length); // Debug log
        setQuestions(response);
        setPagination(prev => ({
          ...prev,
          total: response.length,
        }));
      } else {
        console.log('No questions found in response'); // Debug log
        setQuestions([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch questions');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, []); // Remove initialParams dependency

  const deleteQuestion = useCallback(async (questionId) => {
    try {
      console.log('Attempting to delete question:', questionId);
      const deletedQuestion = await questionService.deleteQuestion(questionId);
      console.log('Question deleted from API:', deletedQuestion);
      
      // Remove the question from the local state
      setQuestions(prev => {
        const updatedQuestions = prev.filter(q => q.id !== questionId);
        console.log('Updated questions list, removed question:', questionId);
        return updatedQuestions;
      });
      
      // Update pagination total
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
      }));
      
      return true;
    } catch (err) {
      console.error('Error in deleteQuestion hook:', err);
      setError(err.message || 'Failed to delete question');
      return false;
    }
  }, []);

  const updateQuestion = useCallback(async (questionId, updatedData) => {
    try {
      const updatedQuestion = await questionService.updateQuestion(questionId, updatedData);
      // Update the question in the local state
      setQuestions(prev => 
        prev.map(q => q.id === questionId ? updatedQuestion : q)
      );
      return updatedQuestion;
    } catch (err) {
      setError(err.message || 'Failed to update question');
      return null;
    }
  }, []);

  const refetch = useCallback((params = {}) => {
    fetchQuestions(params);
  }, [fetchQuestions]);

  useEffect(() => {
    fetchQuestions();
  }, []); // Empty dependency array - only run on mount

  return {
    questions,
    loading,
    error,
    pagination,
    fetchQuestions,
    deleteQuestion,
    updateQuestion,
    refetch,
  };
};

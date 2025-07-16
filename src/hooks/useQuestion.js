import { useState, useEffect } from 'react';
import { questionService } from '../services/questionService';

export const useQuestion = (questionId) => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionId) {
        setQuestion(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const questionData = await questionService.getQuestion(questionId);
        setQuestion(questionData);
      } catch (err) {
        setError(err.message || 'Failed to fetch question');
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  return {
    question,
    loading,
    error,
    refetch: () => {
      if (questionId) {
        setLoading(true);
        setError(null);
        questionService.getQuestion(questionId)
          .then(setQuestion)
          .catch(err => setError(err.message))
          .finally(() => setLoading(false));
      }
    }
  };
};

/** @format */
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const infoResponse = await axios.get(
          'https://opentdb.com/api_category.php'
        );
        const infoResult = infoResponse.data;
        if (infoResult) {
          setCategories(infoResult.trivia_categories);
          setLoading(false);
        } else {
          setError('Could not return categories!');
          setLoading(false);
        }
      } catch (error) {
        if (error.response) {
          console.log(
            'Axios Error:',
            error.response.data,
            error.response.status
          );
          setError(error.response.message);
        }
      }
    };

    fetchData();

    return () => {};
  }, []);

  return [categories, loading, error];
};

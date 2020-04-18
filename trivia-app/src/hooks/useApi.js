/** @format */
import { useState } from 'react';
import axios from 'axios';

export const useApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const decodeString = str => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  };

  const fetchData = async (amount, category) => {
    try {
      setLoading(true);
      const infoResponse = await axios.get('https://opentdb.com/api.php', {
        params: {
          amount: amount,
          category: category
        }
      });
      const infoResult = infoResponse.data;
      if (!infoResult.response_code) {
        setData(
          infoResult.results.map((item, index) => {
            const answer = decodeString(item.correct_answer);
            const options = [
              ...item.incorrect_answers.map(a => decodeString(a)),
              answer
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(item.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5)
            };
          })
        );
        setLoading(false);
      } else {
        setError('Could not return results!');
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        console.log('Axios Error:', error.response.data, error.response.status);
        setError(error.response.message);
        setLoading(false);
      }
    }
  };

  return [data, loading, error, fetchData];
};

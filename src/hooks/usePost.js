import axios from 'axios';
import { useState } from 'react';

const usePost = () => {
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (body) => {
    try {
      setLoading(true);
      const res = await axios.post(`${url}/product`, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
      });
      setError(null);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, body) => {
    try {
      setLoading(true);
      const res = await axios.put(`${url}/product/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
      });
      setError(null);
      return res;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    updateProduct,
    loading,
    error,
  };
};

export default usePost;

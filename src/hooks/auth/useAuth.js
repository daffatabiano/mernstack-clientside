import axios from 'axios';

const useAuth = () => {
  const login = async (body) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return res;
  };

  const register = async (body) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return res;
  };

  return { login, register };
};

export default useAuth;

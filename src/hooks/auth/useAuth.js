import axios from 'axios';
const url = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const login = async (body) => {
    const res = await axios.post(`${url}/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return res;
  };

  const register = async (body) => {
    const res = await axios.post(`${url}/auth/register`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return res;
  };

  return { login, register };
};

export default useAuth;

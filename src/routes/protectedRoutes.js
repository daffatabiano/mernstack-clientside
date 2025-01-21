import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const AdminProtect = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, []);

  return children;
};

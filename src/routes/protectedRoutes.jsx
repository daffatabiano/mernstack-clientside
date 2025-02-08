import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import DashboardLayout from '../pages/dashboard/layout';

export const AdminProtect = (prop) => {
  const { children } = prop;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
  }, [token, navigate]);

  return <DashboardLayout>{children || <Outlet />}</DashboardLayout>;
};

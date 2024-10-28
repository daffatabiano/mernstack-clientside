import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Dashboard from '../pages/dashboard';
import AnalyticsDashboard from '../pages/dashboard/analytics';
import MenuDashboard from '../pages/dashboard/menu';
import Profile from '../pages/dashboard/profile';
import OrderDashboard from '../pages/dashboard/order';
import Home from '../pages/home';
import AbsenceDashboard from '../pages/dashboard/absence';
import Menu from '../pages/menu';

export const routeLists = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '/menu',
    name: 'Menu',
    element: <Menu />,
  },
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
  {
    path: '/register',
    name: 'Register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    element: <Profile />,
  },
  {
    path: '/dashboard/menu',
    name: 'Menu',
    element: <MenuDashboard />,
  },
  {
    path: '/dashboard/analytics',
    name: 'Analytics',
    element: <AnalyticsDashboard />,
  },
  {
    path: '/dashboard/order',
    name: 'Order',
    element: <OrderDashboard />,
  },
  {
    path: '/dashboard/absence',
    name: 'Absence',
    element: <AbsenceDashboard />,
  },
];

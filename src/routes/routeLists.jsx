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
import Order from '../pages/menu/order';
import Coupon from '../pages/menu/coupon';
import Account from '../pages/menu/account';
import ModalPhoneInput from '../components/modals/ModalPhoneInput';
import { AdminProtect } from './protectedRoutes';
import Category from '../pages/dashboard/menu/category';
import SuccesPayment from '../pages/success-payment';

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
    path: '/otp',
    name: 'OTP',
    element: <ModalPhoneInput />,
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
    path: '/success-payment',
    name: 'Success Payment',
    element: <SuccesPayment />,
  },
  {
    path: '/admin-panel/dashboard',
    name: 'Dashboard',
    element: (
      <AdminProtect>
        <Dashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/profile',
    name: 'Profile',
    element: (
      <AdminProtect>
        <Profile />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/products',
    name: 'Menu',
    element: (
      <AdminProtect>
        <MenuDashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/products',
    name: 'Menu',
    element: (
      <AdminProtect>
        <MenuDashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/categories',
    name: 'Categories',
    element: (
      <AdminProtect>
        <Category />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/analytics',
    name: 'Analytics',
    element: (
      <AdminProtect>
        <AnalyticsDashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/order',
    name: 'Order',
    element: (
      <AdminProtect>
        <OrderDashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/admin-panel/dashboard/absence',
    name: 'Absence',
    element: (
      <AdminProtect>
        <AbsenceDashboard />
      </AdminProtect>
    ),
  },
  {
    path: '/order',
    name: 'Order',
    element: <Order />,
  },
  {
    path: '/coupon',
    name: 'Coupon',
    element: <Coupon />,
  },
  {
    path: '/account',
    name: 'Account',
    element: <Account />,
  },
];

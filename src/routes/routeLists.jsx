import Login from '../pages/auth/login';
import Home from '../pages/home';

export const routeLists = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
];

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
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
  {
    path: '/register',
    name: 'Register',
    element: <Register />,
  },
];

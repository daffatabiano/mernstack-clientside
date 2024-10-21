import { useState } from 'react';
import { styles } from '../../helper/styles';
import useAuth from '../../hooks/auth/useAuth';
import AuthLayout from './layout';
import { FaCheck } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const body = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const res = await login(body);
      if (res.status === 200) {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'success',
          icon: <FaCheck />,
        });
        setTimeout(() => {
          setNotify({
            isShown: true,
            message: 'Redirecting...',
            type: 'success',
            icon: <FaCheck />,
          });
          localStorage.setItem('token', res.data.token);
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }, 1000);
      } else {
        setNotify({
          isShown: true,
          message: res.data.message,
          type: 'error',
          icon: <MdError />,
        });
      }
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      }, 2000);
    } catch (error) {
      setNotify({
        isShown: true,
        message: error.response.data.message,
        type: 'error',
        icon: <MdError />,
      });
      setTimeout(() => {
        setNotify({
          isShown: false,
          message: '',
          type: '',
          icon: '',
        });
      }, 2000);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-5xl flex-col  font-bold flex justify-center md:justify-start">
        Login
        <span className="font-normal text-gray-400 text-sm md:text-lg mt-2">
          Enter your credentials, to access your account
        </span>
      </h1>
      {notify.isShown && (
        <div
          className={`flex gap-2 items-center ${
            notify.type === 'success' ? 'bg-green-200' : 'bg-red-200'
          } p-4 rounded-lg mt-4`}>
          <i
            className={`${
              notify.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
            {notify.icon}
          </i>
          <p>{notify.message}</p>
        </div>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-4">
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            placeholder="example@ex.com"
            className={styles.input}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="********"
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-indigo-500">
          Register
        </a>
      </p>
    </AuthLayout>
  );
}

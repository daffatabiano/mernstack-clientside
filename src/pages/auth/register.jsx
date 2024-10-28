import { useState } from 'react';
import { styles } from '../../helper/styles';
import AuthLayout from './layout';
import { MdError } from 'react-icons/md';
import useAuth from '../../hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userReducers';

export default function Register() {
  const dispatch = useDispatch();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });
  const [sections, setSections] = useState(1);
  const handleRegister = async (e) => {
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      born_date: e.target.age.value,
      gender: e.target.gender.value,
    };
    e.preventDefault();
    try {
      const res = await register(body);
      if (res.status === 200) {
        dispatch(login(res.data.data));
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
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        }, 1000);
      }
    } catch (err) {
      setNotify({
        isShown: true,
        message: err.response.data.message,
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
      }, 3000);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-5xl flex-col  font-bold flex justify-center md:justify-start">
        Sign Up
        <span className="font-normal text-gray-400 text-sm md:text-lg mt-2">
          Create a new account for free
        </span>
      </h1>

      {notify.isShown && (
        <div
          className={`flex p-4 mb-4 text-sm gap-2 items-center ${
            notify.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          } border border-${
            notify.type === 'error' ? 'red' : 'green'
          }-500 rounded-lg text-${notify.type}-700`}
          role="alert">
          {notify.icon}
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{notify.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleRegister} className={styles.formAuth}>
        <section
          className={`flex flex-col gap-2  ${
            sections !== 1 ? 'translate-x-[100%] hidden' : 'translate-x-[0%]'
          }`}>
          <label htmlFor="">
            Name
            <input
              type="text"
              placeholder="John Doe"
              className={styles.input}
              name="name"
              required
            />
          </label>
          <label htmlFor="">
            Email
            <input
              type="email"
              placeholder="8Xs8s@example.com"
              className={styles.input}
              name="email"
              required
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type="password"
              placeholder="*******"
              className={styles.input}
              name="password"
              required
            />
          </label>
          <label htmlFor="">
            Confirm Password
            <input
              type="password"
              placeholder="*******"
              className={styles.input}
              name="confirmPassword"
              required
            />
          </label>
        </section>
        <section
          className={`flex flex-col gap-2 transition-all transform duration-300 ${
            sections !== 1 ? 'translate-x-[0%]' : 'translate-x-[100%] hidden'
          }`}>
          <label htmlFor="">
            Born Date
            <input
              type="date"
              min="1"
              max="99"
              step="1"
              pattern="\d{4}-\d{2}-\d{2}"
              name="age"
              placeholder="Age"
              className={styles.input}
              required
            />
          </label>
          <label htmlFor="">
            Gender
            <select name="gender" className={styles.input} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <div className="flex justify-between gap-2">
            <button
              type="button"
              className={`${styles.button} ${
                sections === 1 ? 'translate-x-[100%]' : 'translate-x-[0%] '
              }`}
              onClick={() => setSections(1)}>
              Back
            </button>
            <button
              type="submit"
              className={`${styles.button} ${
                sections === 1 ? 'translate-x-[100%]' : 'translate-x-[0%]'
              }`}>
              Sign Up
            </button>
          </div>
        </section>
        <button
          type="button"
          onClick={() => setSections(sections + 1)}
          className={` ${
            sections === 1 ? 'translate-x-[0%]' : 'translate-x-[100%] hidden'
          } ${styles.button}`}>
          Next
        </button>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-indigo-500 hover:text-indigo-600 font-semibold">
            Sign In
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

import { styles } from '../../helper/styles';
import AuthLayout from './layout';

export default function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-5xl flex-col  font-bold flex justify-center md:justify-start">
        Login
        <span className="font-normal text-gray-400 text-sm md:text-lg mt-2">
          Enter your credentials, to access your account
        </span>
      </h1>
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
        Don't have an account?{' '}
        <a href="/register" className="text-indigo-500">
          Register
        </a>
      </p>
    </AuthLayout>
  );
}

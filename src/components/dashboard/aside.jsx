import { Link, useNavigate } from 'react-router-dom';
import { styles } from '../../helper/styles';
import { listsAside } from '../../helper/constants';

export default function AsideDashboard({ children }) {
  const navigate = useNavigate();
  const { pathname } = window.location;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  return (
    <aside className={styles.aside}>
      <img src="/logo.svg" alt="" className="w-2/3" />
      <ul className="flex flex-col gap-4">
        {listsAside.map((item) => (
          <li
            key={item.name}
            className={`flex gap-4 items-center hover:bg-slate-200 rounded p-4 ${
              pathname === item.path ? 'bg-slate-200' : ''
            }`}
            onClick={() => navigate(item.path)}>
            <i className="text-2xl">{item.icon}</i>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </aside>
  );
}

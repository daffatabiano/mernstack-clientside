import { Link, useNavigate } from 'react-router-dom';
import { styles } from '../../helper/styles';
import { listsAside } from '../../helper/constants';
import { RiArrowDownSLine, RiHome6Line } from 'react-icons/ri';
import CollapseMenu from './collapse/aside-collapse';

export default function AsideDashboard() {
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
        <li
          className={`flex gap-4 items-center transition-all duration-100 hover:uppercase hover:bg-slate-200 hover:transform hover:scale-110 rounded p-4 ${
            pathname === '/admin-panel/dashboard'
              ? 'bg-slate-200 transform scale-110'
              : ''
          }`}>
          <i className="text-2xl">
            <RiHome6Line />
          </i>
          <Link to={'/admin-panel/dashboard'}>Dashboard</Link>
        </li>
        <hr />
        <p className="text-xl font-bold text-slate-500 ">Interface</p>
        {listsAside.map((item) => {
          if (item.child) {
            return (
              <CollapseMenu
                key={item.name}
                item={item.child}
                pathname={pathname}
                navigate={navigate}
                parent={item}
              />
            );
          }

          return (
            <li
              key={item.name}
              className={`flex gap-4 items-center hover:uppercase transition-all duration-100 hover:bg-slate-200 hover:transform hover:scale-110 rounded p-4 ${
                pathname === item.path ? 'bg-slate-200 transform scale-110' : ''
              }  ${item.child && 'justify-between'}`}
              onClick={() => navigate(item?.path)}>
              <div className="flex items-center gap-4">
                <i className="text-2xl">{item.icon}</i>
                <Link to={item.path}>{item.name}</Link>
              </div>
              {item.child && (
                <i className="text-2xl">
                  <RiArrowDownSLine />
                </i>
              )}
            </li>
          );
        })}
      </ul>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </aside>
  );
}

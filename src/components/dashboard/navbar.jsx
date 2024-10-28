import { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function NavbarDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interv = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interv);
  });

  return (
    <nav className="w-full h-1/8 bg-slate-800 p-4 fixed top-0 right-0 left-0  z-10">
      <div className="w-full h-full ps-72 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl flex items-center">
          <span
            className="text-white me-2 text-md bg-indigo-500 rounded-lg p-1 cursor-pointer hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/')}>
            <FaHome />
          </span>{' '}
          Admin Control
        </h1>
        <div className="flex gap-4 items-center">
          <p className="text-white border-2 flex gap-2 text-sm items-center border-white rounded-lg  pe-2 ">
            {' '}
            <span className="text-md bg-white text-slate-800 font-semibold p-1 ">
              {time.toLocaleDateString()}
            </span>
            {time.toLocaleTimeString('it-IT')}
          </p>
          <Link to={'/dashboard/profile'} className="flex gap-4 items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <p className="flex flex-col text-white">
              {user.name}
              <span>{user.email}</span>
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

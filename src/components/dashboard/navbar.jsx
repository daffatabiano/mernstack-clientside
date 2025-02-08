import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const PLACEHOLDER = import.meta.env.VITE_PLACEHOLDER_IMAGE;

export default function NavbarDashboard({}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interv = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interv);
  });

  return (
    <>
      <nav className="w-full h-1/8 bg-white/90 p-4 ps-[22%] sticky top-0 right-0 left-0 z-10 border-b shadow-[0_1px_10px_rgba(0,0,0,0.1)]">
        <div className="w-full h-full flex justify-between items-center">
          <h1 className="text-base-dark font-bold text-xl flex items-center">
            Admin Control
          </h1>
          <div className="flex gap-4 items-center">
            <p className="text-slate-500 border-2 flex gap-2 text-sm items-center border-black rounded-lg  pe-2 ">
              {' '}
              <span className="text-md bg-base-dark text-base-light font-semibold p-1 ">
                {time.toLocaleDateString()}
              </span>
              {time.toLocaleTimeString('it-IT')}
            </p>
            <Link
              to={'/admin-panel/dashboard/profile'}
              className="flex gap-4 items-center">
              <img
                src={
                  user?.image ||
                  `${PLACEHOLDER}/30/dd6699/ffffff/100x100.png?text=${user?.name
                    ?.slice(0, 2)
                    .toUpperCase()}`
                }
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <p className="flex flex-col text-base-dark">
                {user?.name}
                <span>{user?.email}</span>
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

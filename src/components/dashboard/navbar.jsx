import { Link } from 'react-router-dom';

export default function NavbarDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user.age);

  return (
    <nav className="w-full h-1/8 bg-slate-800 p-4 fixed top-0 right-0 left-0 ">
      <div className="w-full h-full ps-72 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Admin Control</h1>
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
    </nav>
  );
}

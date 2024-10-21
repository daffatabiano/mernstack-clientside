export default function NavbarDashboard() {
  return (
    <nav className="w-full h-18 bg-slate-800 p-4 fixed top-0 right-0 left-0 ">
      <div className="w-full h-full ps-72 flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Admin Control</h1>
        <div className="flex gap-4 items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <p className="flex flex-col text-white">
            {`John Doe`}
            <span>{`user@gmail.com`}</span>
          </p>
        </div>
      </div>
    </nav>
  );
}

import { useNavigate } from 'react-router-dom';
import AsideDashboard from '../../components/dashboard/aside';
import NavbarDashboard from '../../components/dashboard/navbar';
import { styles } from '../../helper/styles';
import { FaFingerprint } from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return window.location.replace('/login');

  return (
    <>
      <div className="md:hidden flex fixed justify-center items-center top-0 right-0 left-0 w-screen h-screen bg-slate-800/50">
        <div className="w-1/2 flex gap-4 flex-col p-4 justify-between items-center bg-white rounded">
          <h1 className="text-red-500 text-center font-bold">
            Sorry, this page is not available on mobile
          </h1>
          <button
            className={styles.button}
            type="button"
            onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
      <main className={styles.main}>
        <AsideDashboard />
        <NavbarDashboard />
        <section className="w-full h-full ps-[20%] pt-[6%]">{children}</section>
        <div className="fixed text-white rounded-full bottom-10 right-10 bg-slate-800 p-4 hover:bg-slate-700">
          <i>
            <FaFingerprint />
          </i>
        </div>
      </main>
    </>
  );
}

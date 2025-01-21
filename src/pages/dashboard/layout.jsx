import { useNavigate } from 'react-router-dom';
import AsideDashboard from '../../components/dashboard/aside';
import NavbarDashboard from '../../components/dashboard/navbar';
import { styles } from '../../helper/styles';
import { FaFingerprint } from 'react-icons/fa';
import { CiWarning } from 'react-icons/ci';

export default function DashboardLayout(prop) {
  const { children } = prop;
  const navigate = useNavigate();
  return (
    <>
      <div className="md:hidden flex fixed justify-center items-center top-0 right-0 left-0 min-w-screen min-h-screen w-full h-full bg-slate-800/50">
        <div className="w-4/5 flex flex-col border border-slate-400  justify-between items-center bg-white rounded-lg">
          <h1 className="text-red-500 flex flex-col gap-2 justify-center text-center p-4 font-bold">
            <i className="text-4xl font-bold text-center m-auto">
              <CiWarning />
            </i>
            Sorry, this page is not available on mobile
          </h1>
          <hr className="w-full h-[2px] bg-slate-400" />
          <button
            className="py-2 px-4"
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

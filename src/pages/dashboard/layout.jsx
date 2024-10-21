import AsideDashboard from '../../components/dashboard/aside';
import NavbarDashboard from '../../components/dashboard/navbar';
import { styles } from '../../helper/styles';

export default function DashboardLayout({ children }) {
  return (
    <main className={styles.main}>
      <AsideDashboard />
      <NavbarDashboard />
      <section className="w-full h-full ps-72 pt-20">{children}</section>
    </main>
  );
}

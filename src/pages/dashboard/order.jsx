import useFetch from '../../hooks/useGet';
import DashboardLayout from './layout';

export default function OrderDashboard() {
  const { data } = useFetch('orders');
  const orders = data.data;

  return (
    <DashboardLayout>
      <div className="w-full h-full p-4 flex flex-col justify-center items-center">
        <img src="/images/coming-soon.png" alt="" />
        <h1 className="text-3xl italic font-bold tracking-widest text-amber-400">
          Under Construction !
        </h1>
      </div>
    </DashboardLayout>
  );
}

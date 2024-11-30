import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useGet';
import DashboardLayout from './layout';

export default function OrderDashboard() {
  const { data } = useFetch('orders');
  const { data: tableData } = useFetch('tables');
  const orders = data?.data;
  const navigate = useNavigate();

  const parsingOrderId = (id) => {
    const slicingId = id.slice(0, 8);
    return slicingId.toUpperCase();
  };

  const goToDetails = (id) => {
    return () => {
      navigate(`/dashboard/order/${id}`);
    };
  };

  return (
    <DashboardLayout>
      {orders?.length === 0 ? (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center">
          <img src="/images/coming-soon.png" alt="" />
          <h1 className="text-3xl italic font-bold tracking-widest text-amber-400">
            Under Construction !
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 overflow-auto mt-2 px-2">
          {orders?.map((order) => (
            <button
              type="button"
              onClick={goToDetails(order._id)}
              className="text-wrap bg-white rounded-lg p-4 drop-shadow-sm hover:transform hover:scale-105 transition-all duration-300"
              key={order._id}>
              <h1 className="text-indigo-500 font-semibold">
                # {parsingOrderId(order._id)}
              </h1>
              <p>
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(order?.amount)}
              </p>
            </button>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useGet';
import DashboardLayout from './layout';
import MenuHeader from '../../components/dashboard/MenuHeader';
import { listsOrder } from '../../helper/constants';
import ModalCreate from '../../components/dashboard/modals/modal-create';
import { useEffect, useState } from 'react';
import { useGetAllOrdersQuery } from '../../redux/reducers/api/fetchReducers';
import useSocket from '../../hooks/useSocket';

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [shownAdd, setShownAdd] = useState(false);
  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });
  const [showByCategory, setShowByCategory] = useState('');
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('newOrder', (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
      });

      socket.on('orderStatusUpdated', (data) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === data.orderId
              ? { ...order, status: data.status }
              : order
          )
        );
      });

      return () => {
        socket.off('newOrder');
        socket.off('orderStatusUpdated');
      };
    }
  }, [socket]);

  const handleAdd = async (e) => {
    return setShownAdd(!true);
  };

  const parsingOrderId = (id) => {
    const slicingId = id.slice(0, 8);
    return slicingId.toUpperCase();
  };

  const goToDetails = (id) => {
    return () => {
      navigate(`/dashboard/order/${id}`);
    };
  };

  console.log(orders);

  return (
    <>
      <div className="w-full p-4">
        <MenuHeader
          submenu={listsOrder}
          setShowByCategory={setShowByCategory}
          setShownAdd={setShownAdd}
          addButton={false}
        />
      </div>

      {orders?.length === 0 ? (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center">
          <img
            src="/videos/notfound.gif"
            alt="notfound-animation"
            className="w-full"
          />
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
    </>
  );
}

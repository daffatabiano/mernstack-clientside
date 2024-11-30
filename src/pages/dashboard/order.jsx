import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useGet';
import DashboardLayout from './layout';
import MenuHeader from '../../components/dashboard/menuHeader';
import { listsOrder } from '../../helper/constants';
import ModalCreate from '../../components/dashboard/modals/modal-create';
import { useState } from 'react';

export default function OrderDashboard() {
  const { data } = useFetch('orders');
  const orders = data?.data;
  const { data: tableData } = useFetch('tables');
  const navigate = useNavigate();
  const [shownInputPicture, setShownInputPicture] = useState({
    isShown: false,
    type: '',
    image: '',
  });
  const [shownAdd, setShownAdd] = useState(false);
  const [notify, setNotify] = useState({
    isShown: false,
    message: '',
    type: '',
    icon: '',
  });
  const [showByCategory, setShowByCategory] = useState('');

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

  return (
    <>
      <ModalCreate
        setShownAdd={setShownAdd}
        shownAdd={shownAdd}
        handleAdd={handleAdd}
        notify={notify}
        shownInputPicture={shownInputPicture}
        setShownInputPicture={setShownInputPicture}
      />
      <DashboardLayout>
        <div className="w-full p-4">
          <MenuHeader
            submenu={listsOrder}
            setShowByCategory={setShowByCategory}
            setShownAdd={setShownAdd}
          />
        </div>

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
    </>
  );
}

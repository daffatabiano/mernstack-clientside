import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reducers/cartReducers';
import { getTableId, makeId } from '../utils/throttle';

export default function useAction() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { pathname } = window.location;

  const handlePayment = async (totalPrice, message) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
      navigate('/login');
    } else {
      const body = {
        id: makeId(10),
        amount: totalPrice?.reduce((total, item) => total + item, 0),
        firstName: user?.name?.split(' ')[0],
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email,
        phone: user?.phone,
      };

      if (body.amount === 0) {
        message('Your cart is empty');
      }

      try {
        const res = await axios.post(`${url}/midtrans`, body, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            cache: 'no-cache',
            Authorization: btoa(import.meta.env.CLIENT_KEY + ':'),
          },
        });
        const tokenTransaction = res?.data?.token;

        window.snap.pay(tokenTransaction, {
          onSuccess: async function (result) {
            const orderData = JSON.parse(localStorage.getItem('cart'));
            const bodyOrder = {
              tableId: getTableId(pathname),
              name: user?.name,
              amount: totalPrice?.reduce((total, item) => total + item, 0),
              data: orderData,
              email: user?.email,
              status: 'pending',
            };
            console.log(result);
            const res = await axios.post(`${url}/order`, body, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.status === 200) {
              message('Order Success');

              setTimeout(() => {
                dispatch(clearCart());
                localStorage.removeItem('cart');
                navigate('/order');
                message('Order Processing ...');
              }, 1000);
            }
          },
          onPending: function (result) {
            console.log(result);
          },
          onError: function (result) {
            console.log(result);
          },
          onClose: function () {
            console.log('payment closed');
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { handlePayment };
}

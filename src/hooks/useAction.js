import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reducers/cartReducers';
import { makeId } from '../../utils/throttle';

export default function useAction() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { pathname } = window.location;

  const getTableId = (url) => {
    const words = url.split('/');
    const index = words.findIndex((word) =>
      word.toLowerCase().includes('table')
    );

    if (index !== -1) {
      console.log(words, 'thisiswordiondd');
      return words.slice(index + 3)[0];
    }
    return '';
  };

  const handlePayment = async (totalPrice, message) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      const body = {
        id: makeId(10),
        amount: totalPrice?.reduce((total, item) => total + item, 0),
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
            const bodyOrder = {
              tableId: getTableId(pathname, 'table ID'),
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

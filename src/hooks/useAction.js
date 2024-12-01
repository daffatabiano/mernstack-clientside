import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reducers/cartReducers';

export default function useAction() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const handlePayment = async (totalPrice, dataOrder) => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      const body = {
        amount: totalPrice?.reduce((total, item) => total + item, 0),
        data: dataOrder,
      };
      try {
        const res = await axios.post(`${url}/order`, body, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          try {
            const body = {
              id: res?.data?.data?._id,
              amount: Number(res?.data?.data?.amount),
            };

            const resTransactions = await axios.post(`${url}/midtrans`, body, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: btoa(import.meta.env.CLIENT_KEY + ':'),
              },
            });
            window.snap.pay(resTransactions?.data?.token, {
              onSuccess: function (result) {
                console.log(result);
                dispatch(clearCart());
                localStorage.removeItem('cart');
                navigate('/order');
              },
              onPending: function (result) {
                console.log(result);
                dispatch(clearCart());
                localStorage.removeItem('cart');
                navigate('/history');
              },
              onError: function (result) {
                console.log(result);
                navigate('/error');
              },
              onClose: function () {
                alert('you closed the popup without finishing the payment');
              },
            });
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return { handlePayment };
}

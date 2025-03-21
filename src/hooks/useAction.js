import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { makeId } from '../utils/throttle';

export default function useAction() {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  const handlePayment = async (totalPrice, message) => {
    const token = localStorage.getItem('tokenCust');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
      navigate('/otp');
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

        if (tokenTransaction) {
          localStorage.setItem('dataPayment', JSON.stringify(body));
        }

        window.snap.pay(tokenTransaction);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendOtp = async (body) => {
    try {
      const res = await axios.post(`${url}/send-otp`, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const verifyOtp = async (body) => {
    try {
      const res = await axios.post(`${url}/verify-otp`, body, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return { handlePayment, sendOtp, verifyOtp };
}

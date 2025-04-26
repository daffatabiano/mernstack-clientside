import { useEffect, useState, useRef } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';
import { useSendOrderCustomerMutation } from '../redux/reducers/api/postReducers';

export default function SuccesPayment() {
  const navigate = useNavigate();
  const [successIndicator, setSuccessIndicator] = useState(0);
  const requestSent = useRef(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendOrderCustomer] = useSendOrderCustomerMutation();

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('orders');

    channel.bind('payment-success', (data) => {
      setSuccessIndicator(10);
      localStorage.removeItem('cart');
      localStorage.removeItem('dataPayment');
      console.log(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    if (requestSent.current) return;

    const dataPayment = JSON.parse(localStorage.getItem('dataPayment'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const tableId = localStorage.getItem('tableId');

    if (!dataPayment || !cart || !tableId) return;

    const sendToOrder = async () => {
      const body = {
        tableId: tableId,
        name: dataPayment.firstName,
        email: dataPayment.email,
        amount: dataPayment.amount,
        orderData: cart.map((item) => ({
          category: item.category,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          discount: item.discount,
          image: item.image,
          notes: item.notes,
        })),
      };

      requestSent.current = true; // Set before making the API call

      try {
        await sendOrderCustomer(body);
        setIsSuccess(true);
      } catch (error) {
        console.log('Order submission failed:', error);
        requestSent.current = false; // Allow retry on failure
      }
    };

    sendToOrder();
  }, [sendOrderCustomer]); // Only trigger once on mount

  useEffect(() => {
    if (isSuccess) {
      setSuccessIndicator(10);
      localStorage.removeItem('cart');
      localStorage.removeItem('dataPayment');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (successIndicator > 0) {
      const interval = setInterval(() => {
        setSuccessIndicator((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [successIndicator, isSuccess, navigate]);

  return (
    <div className="flex flex-col place-content-center h-screen">
      <Result
        status="success"
        title="Order Has Been Placed Successfully"
        subTitle="Your order has been placed successfully. Please check your email for more details."
        extra={[
          <Button type="primary" key="console" onClick={() => navigate('/')}>
            Home
          </Button>,
          <Button key="buy" onClick={() => navigate('/order')}>
            See Orders
          </Button>,
        ]}
      />
      <p className="text-center text-middle-dark font-light italic text-sm">
        You will be redirected to the order page
      </p>
      {isSuccess && (
        <p className="text-center text-base-dark font-light">
          in{' '}
          <span className="text-indigo-500 font-bold">{successIndicator}</span>{' '}
          seconds
        </p>
      )}
    </div>
  );
}

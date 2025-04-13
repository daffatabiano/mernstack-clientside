import { useEffect, useState, useRef } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export default function SuccesPayment() {
  const navigate = useNavigate();
  const [successIndicator, setSuccessIndicator] = useState(0);
  const requestSent = useRef(false);
  const socket = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_URL_WS, {
      // Make sure to use the correct URL
      transports: ['websocket'], // Use websocket protocol
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  });

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
        if (socket.current) {
          socket.current.emit('newOrder', body); // Send order data to backend
          setIsSuccess(true);
        }
      } catch (error) {
        console.log('Order submission failed:', error);
        requestSent.current = false; // Allow retry on failure
      }
    };

    sendToOrder();
  }, []); // Only trigger once on mount

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

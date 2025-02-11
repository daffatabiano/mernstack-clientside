import { useEffect, useState, useRef } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSendOrderCustomerMutation } from '../redux/reducers/api/postReducers';

export default function SuccesPayment() {
  const navigate = useNavigate();
  const [sendOrderCustomer, { isLoading, isSuccess }] =
    useSendOrderCustomerMutation();
  const [successIndicator, setSuccessIndicator] = useState(0);
  const requestSent = useRef(false); // Prevent infinite loop

  useEffect(() => {
    if (requestSent.current) return; // Prevent multiple requests

    const dataPayment = JSON.parse(localStorage.getItem('dataPayment'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const tableId = localStorage.getItem('tableId');

    if (!dataPayment || !cart || !tableId) return;

    const sendToOrder = async () => {
      const body = {
        tableId,
        name: dataPayment.firstName,
        email: dataPayment.email,
        amount: dataPayment.amount,
        orderData: cart,
      };

      try {
        await sendOrderCustomer(body).unwrap();
        requestSent.current = true; // Mark request as sent
      } catch (error) {
        console.log(error);
      }
    };

    sendToOrder();
  }, [sendOrderCustomer]); // Remove `dataPayment` to avoid infinite loop

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
    } else if (successIndicator === 0 && isSuccess) {
      navigate('/order');
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

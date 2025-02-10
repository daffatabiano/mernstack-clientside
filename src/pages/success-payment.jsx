import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSendOrderCustomerMutation } from '../redux/reducers/api/postReducers';

export default function SuccesPayment() {
  const dataPayment = JSON.parse(localStorage.getItem('dataPayment'));
  const [sendOrderCustomer, { isLoading, isSuccess }] =
    useSendOrderCustomerMutation();
  const [successIndicator, setSuccessIndicator] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (dataPayment) {
      async function sendToOrder() {
        const orderData = JSON.parse(localStorage.getItem('cart'));
        const token = localStorage.getItem('token');
        await sendOrderCustomer(orderData).unwrap();
        if (!isLoading && isSuccess) {
          localStorage.removeItem('cart');
          localStorage.removeItem('dataPayment');
          const count = setInterval(() => {
            setSuccessIndicator((prevTime) => prevTime - 1);
          }, 1000);
          setTimeout(() => {
            clearInterval(count);
            navigate('/order');
          }, 5000);
        }
      }
      localStorage.removeItem('dataPayment');
      sendToOrder();
    }
  }, [dataPayment]);
  return (
    <>
      {isSuccess && (
        <>
          <Result
            status="success"
            title="Order Has Been Placed Successfully"
            subTitle="Your order has been placed successfully. Please check your email for more details."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => navigate('/')}>
                Home
              </Button>,
              <Button key="buy" onClick={() => navigate('/order')}>
                See Orders
              </Button>,
            ]}
          />
          <p className="text-center text-base-dark font-light">
            in{' '}
            <span className="text-indigo-500 font-bold">
              {successIndicator}
            </span>{' '}
            seconds
          </p>
          <p className="text-center text-middle-dark font-light italic text-sm">
            You will be redirected to the order page
          </p>
        </>
      )}
    </>
  );
}

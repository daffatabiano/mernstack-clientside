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

  const sendToOrder = async () => {
    const { firstName, email, amount } = JSON.parse(
      localStorage.getItem('orderData')
    );
    const cart = JSON.parse(localStorage.getItem('cart'));
    const tableId = localStorage.getItem('tableId');
    const body = {
      tableId: tableId,
      name: firstName,
      email: email,
      amount: amount,
      orderData: cart,
    };

    try {
      await sendOrderCustomer(body).unwrap();
      if (!isLoading) {
        localStorage.removeItem('cart');
        localStorage.removeItem('dataPayment');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendToOrder();
    localStorage.removeItem('dataPayment');
  }, [dataPayment, isLoading, sendOrderCustomer, sendToOrder]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSuccessIndicator((prev) => prev - 1);
    }, 1000);

    if (successIndicator === 0) {
      navigate('/order');
    }

    return () => {
      clearInterval(interval);
    };
  }, [navigate, successIndicator, isSuccess]);
  return (
    <>
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
        <p className="text-center text-base-dark font-light">
          in{' '}
          <span className="text-indigo-500 font-bold">{successIndicator}</span>{' '}
          seconds
        </p>
      </div>
    </>
  );
}

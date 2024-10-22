import axios from 'axios';

const useGet = () => {
  const url = import.meta.env.VITE_API_URL;

  const getUser = async () => {
    const res = await axios.get(`${url}/users`);

    return res;
  };

  const getProducts = async () => {
    const res = await axios.get(`${url}/products`);

    return res;
  };

  const getOrders = async () => {
    const res = await axios.get(`${url}/orders`);

    return res;
  };

  const getProductsById = async (id) => {
    const res = await axios.get(`${url}/products/${id}`);

    return res;
  };

  return { getUser, getProducts, getOrders, getProductsById };
};

export default useGet;

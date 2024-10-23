import axios from 'axios';

const usePost = () => {
  const url = import.meta.env.VITE_API_URL;

  const createProduct = async (body) => {
    const res = await axios.post(`${url}/product`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });

    return res;
  };

  const updateProduct = async (body) => {
    const res = await axios.put(`${url}/products/${body._id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });

    return res;
  };

  return {
    createProduct,
    updateProduct,
  };
};

export default usePost;

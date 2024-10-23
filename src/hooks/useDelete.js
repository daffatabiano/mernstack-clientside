import axios from 'axios';

const useDelete = () => {
  const url = import.meta.env.VITE_API_URL;
  const deleteProduct = async (id) => {
    const res = await axios.delete(`${url}/product/${id}`);
    return res;
  };
  return { deleteProduct };
};

export default useDelete;

import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (endpoint) => {
  const url = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${url}/${endpoint}`);

      setData(res.data);
    };

    fetchData();
  }, [endpoint]);

  return { data };
};

export default useFetch;

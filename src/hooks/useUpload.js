import axios from 'axios';

function useUpload() {
  const url = import.meta.env.VITE_API_URL;
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(`${url}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  return { upload };
}

export default useUpload;

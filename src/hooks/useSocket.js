import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(import.meta.env.VITE_SOCKET_URL);
    setSocket(socketIo);

    // Clean up when component unmounts
    return () => socketIo.disconnect();
  }, []);

  return socket;
};

export default useSocket;

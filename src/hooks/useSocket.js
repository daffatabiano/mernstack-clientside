import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socketInstance = io(import.meta.env.VITE_API_URL, {
      // Make sure to use the correct URL
      transports: ['websocket'], // Use websocket protocol
    });

    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return socket;
};

export default useSocket;

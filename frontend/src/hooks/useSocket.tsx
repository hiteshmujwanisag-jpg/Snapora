import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import {SOCKET_URL} from '../constant/ApiUrls'

export default function useSocket() {
  const socket:any = useRef(null);
  const user = useSelector((state:any) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    socket.current = io(SOCKET_URL ,{
      query: { userId: user._id },
      withCredentials: true,
       transports: ["websocket"],
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  return socket;
}

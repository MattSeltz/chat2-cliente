"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Home() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER, {
      withCredentials: true,
    });

    socketInstance.on("usersList", (res) => setUsersList(res));

    return () => {
      socketInstance.off("usersList");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <main className="h-screen flex justify-center items-center">
      <p className="text-3xl">
        Usuarios conectados: <strong>{usersList.length}</strong>
      </p>
    </main>
  );
}

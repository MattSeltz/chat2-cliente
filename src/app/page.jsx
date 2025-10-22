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
    <main className="h-screen flex flex-col justify-center items-center gap-8">
      <p className="text-3xl">
        Usuarios conectados: <strong>{usersList.length}</strong>
      </p>

      <ul>
        {usersList.map(({ user }) => (
          <li
            key={user}
            className="text-xl transition-shadow hover:shadow shadow-white cursor-pointer rounded px-4 py-2"
          >
            {user}
          </li>
        ))}
      </ul>
    </main>
  );
}

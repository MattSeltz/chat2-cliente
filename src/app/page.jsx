"use client";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/services";

export default function Home() {
  const router = useRouter();

  const [usersList, setUsersList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u);

    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER, {
      withCredentials: true,
    });

    socketInstance.on("usersList", (res) => {
      const filterUsersList = res.filter(
        ({ user }) => user !== localStorage.getItem("user")
      );
      setUsersList(filterUsersList);
    });

    return () => {
      socketInstance.off("usersList");
      socketInstance.disconnect();
    };
  }, []);

  const handleClickSignOut = async () => {
    try {
      const [isSuccess, data] = await logout();

      if (isSuccess) {
        router.push("/login");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-8 relative">
      <p className="text-3xl">
        Connected users: <strong>{usersList.length}</strong>
      </p>

      <ul>
        {usersList.length ? (
          usersList.map(({ user }) => (
            <li
              key={user}
              className="text-xl transition-shadow hover:shadow shadow-white cursor-pointer rounded px-4 py-2"
            >
              {user}
            </li>
          ))
        ) : (
          <p>No user has logged in yet</p>
        )}
      </ul>

      <button
        type="button"
        className="absolute bottom-4 left-4 transition-opacity hover:opacity-50"
        onClick={handleClickSignOut}
      >
        {errorMessage ? errorMessage : "Sign Out"}
      </button>

      <button
        type="button"
        className="absolute bottom-4 right-4 transition-opacity hover:opacity-50"
      >
        {user}
      </button>
    </main>
  );
}

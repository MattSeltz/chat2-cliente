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
    <main className="h-screen flex gap-8 p-8 relative">
      {/* <p className="text-3xl">
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
      </ul> */}

      <section className="shadow shadow-white rounded h-[95%] w-1/4 p-4 flex flex-col items-center gap-8">
        <button
          type="button"
          className="bg-white text-black font-bold rounded px-4 py-2 cursor-pointer transition-opacity hover:opacity-50 mt-8"
        >
          New chat
        </button>

        <ul className="p-4">
          <li className="text-xl transition-shadow hover:shadow shadow-white cursor-pointer rounded px-4 py-2">
            Marcus
          </li>
          <li className="text-xl transition-shadow hover:shadow shadow-white cursor-pointer rounded px-4 py-2">
            Max
          </li>
        </ul>
      </section>

      <section className="shadow shadow-white rounded h-[95%] w-3/4 p-4 flex flex-col justify-between">
        <header className="flex justify-between shadow shadow-white rounded p-4">
          <p>Online</p>

          <p>Marcus</p>
        </header>

        <ul className="flex flex-col gap-8 overflow-auto py-4">
          <li className="bg-white text-black font-bold rounded px-4 py-2 self-start">
            Hola
          </li>
          <li className="bg-white text-black font-bold rounded px-4 py-2 self-end">
            Hola
          </li>
          <li className="bg-white text-black font-bold rounded px-4 py-2 self-start">
            ¿Cómo estas?
          </li>
          <li className="bg-white text-black font-bold rounded px-4 py-2 self-end">
            Bien, ¿Y vos?
          </li>
          <li className="bg-white text-black font-bold rounded px-4 py-2 self-start">
            Bien
          </li>
        </ul>
        <input
          type="text"
          placeholder="Message..."
          className="shadow shadow-white rounded px-4 py-2 w-full"
        />
      </section>

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

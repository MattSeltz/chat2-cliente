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
  const [isShowModal, setIsShowModal] = useState(false);

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
      {isShowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={() => {
              /* cerrar modal */
            }}
          ></div>

          {/* Modal */}
          <div className="relative bg-black shadow shadow-white rounded max-w-md w-full mx-4 p-6 z-10">
            {/* Botón cerrar */}
            <button
              className="absolute top-4 right-4 text-white transition-opacity hover:opacity-50"
              onClick={() => {
                /* cerrar modal */
                setIsShowModal(false);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Contenido */}
            <h2 className="text-2xl font-bold text-white mb-4">
              Connected users: <strong>{usersList.length}</strong>
            </h2>

            <ul className="text-white mb-6 p-4">
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

            {/* Botones de acción */}
            <div className="flex gap-3 justify-end">
              <button
                className="shadow shadow-white rounded px-4 py-2 transition-opacity hover:opacity-50"
                onClick={() => {
                  /* cerrar modal */
                  setIsShowModal(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-white text-black font-bold rounded px-4 py-2 transition-opacity hover:opacity-50"
                onClick={() => {
                  /* acción principal */
                  setIsShowModal(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="shadow shadow-white rounded h-[95%] w-1/4 p-4 flex flex-col items-center gap-8">
        <button
          type="button"
          className="bg-white text-black font-bold rounded px-4 py-2 cursor-pointer transition-opacity hover:opacity-50 mt-8"
          onClick={() => setIsShowModal(true)}
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

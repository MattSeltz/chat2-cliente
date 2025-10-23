"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/form/Form";

import { login } from "@/services/services";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password)
      return setErrorMessage("All fields are required");

    try {
      const [isSuccess, data] = await login({ username, password });

      if (isSuccess) {
        localStorage.setItem("user", username);
        router.push("/");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Form
      isLogin={true}
      username={username}
      setUsername={setUsername}
      email={""}
      setEmail={""}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
}

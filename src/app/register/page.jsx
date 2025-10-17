"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/form/Form";

import { register } from "@/services/services";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password)
      return setErrorMessage("All fields are required");

    try {
      const [isSuccess, data] = await register({ username, email, password });

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
    <Form
      isLogin={false}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
}

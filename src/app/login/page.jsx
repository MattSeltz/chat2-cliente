"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/form/Form";

import { login } from "@/services/services";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return setErrorMessage("All fields are required");

    try {
      const [isSuccess, data] = await login({ email, password });

      if (isSuccess) {
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
      username={""}
      setUsername={""}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorMessage={errorMessage}
    />
  );
}

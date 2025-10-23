import Link from "next/link";

import { Input } from "./Input";

export const Form = ({
  isLogin,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  errorMessage,
}) => {
  return (
    <form
      autoComplete="off"
      className="h-screen flex flex-col justify-center items-center gap-4 relative"
      onSubmit={handleSubmit}
    >
      <Input
        text={"Username"}
        type={"text"}
        value={username}
        setValue={setUsername}
      />
      {!isLogin && (
        <Input
          text={"Email"}
          type={"email"}
          value={email}
          setValue={setEmail}
        />
      )}
      <Input
        text={"Password"}
        type={"password"}
        value={password}
        setValue={setPassword}
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="bg-white text-black font-bold rounded px-4 py-2 cursor-pointer transition-opacity hover:opacity-50"
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>

      <Link
        href={`/${isLogin ? "register" : "login"}`}
        className="absolute bottom-4 right-4 transition-opacity hover:opacity-50"
      >
        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
      </Link>
    </form>
  );
};

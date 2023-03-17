import React from "react";
import Header from "../components/Header";

export default function LoginPage() {
  return (
    <div className="mt-4">
      <h1 className="text-4xl text-center">Login</h1>
      <form className="max-w-md mx-auto">
        <input type="email" name="" id="" placeholder="your@mail.com" />
        <input type="password" name="" id="" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
}

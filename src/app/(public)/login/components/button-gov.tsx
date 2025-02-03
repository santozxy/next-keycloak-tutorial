"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginGovButton() {
  const handleLogin = async () => {
    const login = await signIn("keycloak", {
      callbackUrl: "/", // Redirect to home page after login
    });
    console.log("login", login);
    if (login?.error) {
      console.error("Erro ao logar", login.error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
    >
      Entrar com Gov.br
    </Button>
  );
}

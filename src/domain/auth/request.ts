import { ApiResponse } from "@/api/types";
import { Auth } from "./types";

async function login(token: string) {
  const response = await fetch(
    "https://demo.pontopi.syslae.com.br/api/login/social",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    }
  );
  const data: ApiResponse<Auth> = await response.json();
  return data;
}

export { login };

import { ApiResponse } from "@/api/types";
import { Auth } from "./types";

const url = process.env.NEXT_PUBLIC_API_URL;

async function login(token: string) {
  const response = await fetch(`${url}/login/social`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const data: ApiResponse<Auth> = await response.json();
  return data;
}

export { login };

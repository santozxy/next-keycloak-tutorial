import Image from "next/image";
import { LoginGovButton } from "./components/button-gov";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image src="/logo.svg" alt="logo" width={80} height={80} />
      <h1 className="text-4xl font-bold">Welcome to your app</h1>
      <LoginGovButton />
    </div>
  );
}

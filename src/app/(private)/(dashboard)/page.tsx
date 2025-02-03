import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ButtonLogout } from "../components/button-logout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">Bem-vindo ao Sistema</h1>
      <h1>Olá {session?.user.name}</h1>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <ButtonLogout />
    </div>
  );
}

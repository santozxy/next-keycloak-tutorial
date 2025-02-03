import { login } from "@/domain/auth/request";
import { Auth } from "@/domain/auth/types";
import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    // Configuração do Keycloak
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: { params: { scope: "openid" } },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account }) => {
      // Recebe o token do Keycloak e faz login no backend. O jwt é persistido no cookie
      if (account) {
        try {
          const auth = await login(account.access_token as string);
          token.user = auth.data.user;
          token.backendToken = auth.data.token;
          // Personaliza o token de acordo com os dados que vem do backend e serão necessários
        } catch (error) {
          console.error("Error logging in to backend:", error);
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      // A sessão recebe o token personalizado persistido no cookie evitando a necessidade de fazer login toda vez que a página é recarregada
      session.user = token.user as Auth["user"];
      session.token = token.backendToken as string;
      session.expires = token.expires as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

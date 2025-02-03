import { login } from "@/domain/auth/request";
import { Auth } from "@/domain/auth/types";
import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: { params: { scope: "openid" } },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        try {
          const auth = await login(account.access_token as string);
          token.user = auth.data.user;
          token.backendToken = auth.data.token;
        } catch (error) {
          console.error("Error logging in to backend:", error);
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
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

import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "jsmith"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req): Promise<User | null> {
        const users = [
            {id: "1", username: "jsmith", password: "123456" , email: "jsmith@example.com"},
            {id: "2", username: "admin", password: "123456", email: "admin@example.com"},
        ];
        const user = users.find((user) => user.username === credentials.username);
        if (user && user.password === credentials.password) {
            return { id: user.id, name: user.username, email: user.email } as User;
        }
        return null;
      }
    })
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};  

export const {handlers, auth, signIn, signOut} = NextAuth(authOptions);

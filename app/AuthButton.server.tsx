import { SessionProvider } from "next-auth/react";
import { AuthButtonClient } from "./AuthButton.client";
import { auth } from "@/auth";

export const AuthButton = async () => {
    const session = await auth();
    if (session && session.user) {
        session.user={name: session.user.name, email: session.user.email};  
    }
    return <SessionProvider session={session}>
        <AuthButtonClient />
    </SessionProvider>
};

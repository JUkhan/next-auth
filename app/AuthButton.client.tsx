"use client";
import { useSession} from "next-auth/react";
import { signIn, signOut } from "@/auth/helper";
import { Button } from "@/components/ui/button";

export const AuthButtonClient = () => {
    const { data: session } = useSession();
    return session? <Button onClick={async () =>{
        await signOut(); 
        await signIn();
    }}>Sign Out</Button> : <Button onClick={async ()=>await signIn()}>Sign In</Button>;   
}

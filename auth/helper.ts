"use server";

import { signIn as signInHandler, signOut as signOutHandler } from ".";



export const signIn = async () => {
    await signInHandler();
};

export const signOut = async () => {

    await signOutHandler();
};
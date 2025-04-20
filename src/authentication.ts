import React from "react";
import { Role } from "./role";


export type Authenticated =
{
    status: 'authenticated';
    logout: () => void;
    username: string;
    role: Role;
}

export type Unauthenticated =
{
    status: 'unauthenticated';
    login: (username: string, role: Role) => void;
}

export type AuthenticationStatus = Authenticated | Unauthenticated;


export const dummyAuthentication: AuthenticationStatus = {
    status: 'unauthenticated',
    login: () => { throw new Error("Not implemented"); }
}

export const AuthenticationContext = React.createContext<AuthenticationStatus>(dummyAuthentication);


export function createUnauthenticatedStatus(setStatus: (status: AuthenticationStatus) => void): AuthenticationStatus
{
    return {
        status: 'unauthenticated',
        login
    };

    function login(username: string, role: Role)
    {
        setStatus({
            status: 'authenticated',
            username,
            role,
            logout,
        });
    }


    function logout()
    {
        setStatus({
            status: 'unauthenticated',
            login,
        });
    }
}
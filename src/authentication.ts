import React from "react";
import { Role } from "./role";


export type AuthenticationData = { username: number, role: Role } | null;

export type Authenticated =
{
    status: 'authenticated';
    logout: () => void;
    username: number;
    role: Role;
}

export type Unauthenticated =
{
    status: 'unauthenticated';
    login: (username: number, role: Role) => void;
}

export type AuthenticationStatus = Authenticated | Unauthenticated;


export const dummyAuthentication: AuthenticationStatus = {
    status: 'unauthenticated',
    login: () => { throw new Error("Bug: this should never be reached"); }
}

export const AuthenticationContext = React.createContext<AuthenticationStatus>(dummyAuthentication);


export function createAuthenticationStatusFromAuthenticationData(authenticationData: AuthenticationData, setAuthenticationData: (data: AuthenticationData) => void): AuthenticationStatus
{
    if (authenticationData !== null)
    {
        return {
            status: 'authenticated',
            username: authenticationData.username,
            role: authenticationData.role,
            logout,
        };
    }
    else
    {
        return {
            status: 'unauthenticated',
            login,
        };
    }


    function login(username: number, role: Role)
    {
        setAuthenticationData({ username, role });
    }


    function logout()
    {
        setAuthenticationData(null);
    }
}


export function useAuthentication(): AuthenticationStatus
{
    return React.useContext(AuthenticationContext);
}

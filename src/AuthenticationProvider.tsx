import React from "react";
import { AuthenticationContext, AuthenticationStatus, createUnauthenticatedStatus, dummyAuthentication } from "./authentication";


export function AuthenticationProvider({ children }: { children: React.ReactNode }) : React.ReactElement
{
    const [, setAuthenticationData] = React.useState<AuthenticationStatus>(dummyAuthentication);


    return (
        <AuthenticationContext.Provider value={createUnauthenticatedStatus(setAuthenticationData)}>
            {children}
        </AuthenticationContext.Provider>
    );
}
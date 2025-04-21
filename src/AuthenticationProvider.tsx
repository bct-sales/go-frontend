import React from "react";
import { AuthenticationContext, AuthenticationData, createAuthenticationStatusFromAuthenticationData } from "./authentication";


export function AuthenticationProvider({ children }: { children: React.ReactNode }): React.ReactElement
{
    const [authentication, setAuthenticationData] = React.useState<AuthenticationData>(null);
    const authenticationStatus = React.useMemo(() => createAuthenticationStatusFromAuthenticationData(authentication, setAuthenticationData), [authentication]);

    return (
        <AuthenticationContext.Provider value={authenticationStatus}>
            {children}
        </AuthenticationContext.Provider>
    );
}
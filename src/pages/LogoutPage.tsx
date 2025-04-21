import { useAuthentication } from '@/authentication';
import { logout } from '@/rest/logout';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function LogoutPage() : React.ReactNode
{
    const authentication = useAuthentication();
    const navigate = useNavigate();

    if ( authentication.status === 'authenticated' )
    {
        authentication.logout();
    }

    useEffect(() => {
        void (async () => {
            await logout();
            navigate('/login');
        })();
    }, [navigate]);

    return <></>;
}
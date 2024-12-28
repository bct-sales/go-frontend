import { logout } from '@/rest/logout';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function LogoutPage() : React.ReactNode
{
    const navigate = useNavigate();

    useEffect(() => {
        void (async () => {
            await logout();
            navigate('/login');
        })();
    }, [navigate]);

    return <></>;
}
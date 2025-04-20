import React from 'react'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pages from '@/pages';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthenticationProvider } from './AuthenticationProvider';


export default function App() : React.ReactNode
{
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <pages.LoginPage />,
        },
        {
            path: '/logout',
            element: <pages.LogoutPage />,
        },
        {
            path: '/admin/*',
            element: <pages.AdminDashboard />,
        },
        {
            path: '/seller/*',
            element: <pages.SellerDashboard />,
        },
    ]);

    return (
        <AuthenticationProvider>
            <MantineProvider defaultColorScheme="dark">
                <Notifications />
                <RouterProvider router={router} />
            </MantineProvider>
        </AuthenticationProvider>
    );
}

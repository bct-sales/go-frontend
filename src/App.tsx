import React from 'react'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pages from '@/pages';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthenticationProvider } from './AuthenticationProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SettingsProvider } from './SettingsProvider';


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
        {
            path: '/cashier/*',
            element: <pages.CashierDashboard />,
        },
    ]);

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SettingsProvider>
                <AuthenticationProvider>
                    <MantineProvider defaultColorScheme="dark">
                        <Notifications />
                        <RouterProvider router={router} />
                    </MantineProvider>
                </AuthenticationProvider>
            </SettingsProvider>
        </QueryClientProvider>
    );
}

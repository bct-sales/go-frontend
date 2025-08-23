import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as pages from '@/pages';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthenticationProvider } from './AuthenticationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsProvider } from './SettingsProvider';
import WebsocketProvider from './components/WebsocketProvider';
import RedirectToLoginPage from './components/RedirectToLoginPage';


export default function App() : React.ReactNode
{
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RedirectToLoginPage />
        },
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
        <WebsocketProvider url="ws://localhost:8000/api/v1/websocket">
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
        </WebsocketProvider>
    );
}

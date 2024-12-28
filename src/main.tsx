import React from 'react'
import './index.css'
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import * as pages from '@/pages';
import App from './App';
import { MantineProvider } from '@mantine/core';

const root = document.getElementById('root');

if ( root )
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
        }
    ]);

    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <MantineProvider defaultColorScheme="dark">
                <RouterProvider router={router} />
            </MantineProvider>
        </React.StrictMode>,
    );
}
else
{
    console.error(`Fatal bug: could not find element with id="root"`);
}

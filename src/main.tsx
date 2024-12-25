import React from 'react'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import * as pages from '@/pages';

const root = document.getElementById('root');

if ( root )
{
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: "/login",
                    element: <pages.LoginPage />
                }
            ]
        },
    ]);

    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
}
else
{
    console.error(`Fatal bug: could not find element with id="root"`);
}

import React from 'react'
import './index.css'
//import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.css';
import ReactDOM from 'react-dom/client'
import App from './App';

const root = document.getElementById('root');

if ( root )
{
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
else
{
    console.error(`Fatal bug: could not find element with id="root"`);
}

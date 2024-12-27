import { MantineProvider } from '@mantine/core';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <Outlet />
        </>
    )
}

export default App

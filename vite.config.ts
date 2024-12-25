import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';


interface Definitions
{
    ROOT_URL : string;
}

// https://vite.dev/config/
export default defineConfig(({ command } ) => {
    // command === 'serve' on npm run dev
    // command === 'build' on npm run build
    const isDevBuild = command === 'serve';

    return {
        plugins: [
            react(),
            tsconfigPaths()
        ],
        define: buildSpecificationDefinitions(),
    };


    function devBuildDefinitions() : Definitions
    {
        return {
            ROOT_URL: JSON.stringify('http://localhost:8000/api/v1'),
        };
    }

    function prodBuildDefinitions() : Definitions
    {
        return {
            ROOT_URL: JSON.stringify('/api/v1'),
        };
    }

    function buildSpecificationDefinitions() : Definitions
    {
        if ( isDevBuild )
        {
            return devBuildDefinitions();
        }
        else
        {
            return prodBuildDefinitions();
        }
    }
})

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
        ...proxySettings(),
    };


    function proxySettings() : object
    {
        if ( isDevBuild )
        {
            return {
                server: {
                    proxy: {
                        '/api/v1': {
                            target: 'http://localhost:8000'
                        }
                    }
                }
            };
        }
        else
        {
            return {};
        }
    }

    function buildSpecificationDefinitions() : Definitions
    {
        return {
            ROOT_URL: JSON.stringify('/api/v1'),
        };
    }
})

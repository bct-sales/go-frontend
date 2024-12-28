import axios from 'axios';
import { extractDetailFromException } from './errors';
import { paths } from './paths';


export async function logout(): Promise<void>
{
    const url = paths.logout;

    try
    {
        await axios.get<unknown>(url);
    }
    catch ( error: unknown )
    {
        const detail = extractDetailFromException(error);

        if ( detail !== null )
        {
            return undefined;
        }
        else
        {
            console.error(error);
            return undefined;
        }
    }
}

import axios from 'axios';
import { extractDetailFromException } from './errors';


export async function logout(): Promise<void>
{
    const url = `${ROOT_URL}/logout`;

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

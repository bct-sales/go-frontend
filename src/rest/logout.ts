import axios from 'axios';
import { paths } from './paths';
import { identifyErrorInException } from './result';


export async function logout(): Promise<void>
{
    const url = paths.logout;

    try
    {
        await axios.post<unknown>(url.toString());
    }
    catch ( exception: unknown )
    {
        const error = identifyErrorInException(exception);

        console.error("Failed to logout: ", error);
    }
}

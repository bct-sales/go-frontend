import axios from 'axios';
import { z } from 'zod';
import { extractDetailFromException } from './errors';



const ItemCountsResponse = z.object({
    counts: z.record(z.number())
});

type ItemCountsResponse = z.infer<typeof ItemCountsResponse>;


export async function getItemCountsPerCategory(): Promise<ItemCountsResponse | undefined>
{
    const url = `${ROOT_URL}/category-counts`;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ItemCountsResponse.parse(response.data);

        return data;
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

import axios from 'axios';
import { z } from 'zod';
import { extractDetailFromException } from '../errors';
import { paths } from '../paths';


const Item = z.object({

});

export type Item = z.infer<typeof Item>;


const ListItemsResponse = z.object({
    items: z.array(Item),
})

type ListItemsResponse = z.infer<typeof ListItemsResponse>;




export async function listItems(): Promise<Item[] | undefined>
{
    const url = paths.users;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ListItemsResponse.parse(response.data);

        return data.items;
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

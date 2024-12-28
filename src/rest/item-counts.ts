import axios from 'axios';
import { z } from 'zod';
import { extractDetailFromException } from './errors';


const ItemCountByCategory = z.object({
    category_id: z.number().int().nonnegative(),
    category_name: z.string().nonempty(),
    count: z.number().int().nonnegative(),
})

export type ItemCountByCategory = z.infer<typeof ItemCountByCategory>;

const ItemCountsByCategoryResponse = z.object({
    counts: z.array(ItemCountByCategory),
});

export type ItemCountsByCategoryResponse = z.infer<typeof ItemCountsByCategoryResponse>;


export async function getItemCountsPerCategory(): Promise<ItemCountsByCategoryResponse | undefined>
{
    const url = `${ROOT_URL}/category-counts`;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ItemCountsByCategoryResponse.parse(response.data);

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

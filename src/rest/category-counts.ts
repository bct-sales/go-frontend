import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';


const ItemCountByCategory = z.object({
    categoryId: z.number().int().nonnegative(),
    categoryName: z.string().nonempty(),
    count: z.number().int().nonnegative(),
})

export type ItemCountByCategory = z.infer<typeof ItemCountByCategory>;

const ItemCountsByCategoryResponse = z.object({
    categories: z.array(ItemCountByCategory),
});

export type ItemCountsByCategoryResponse = z.infer<typeof ItemCountsByCategoryResponse>;


export async function getItemCountsPerCategory(): Promise<RestResult<ItemCountsByCategoryResponse>>
{
    const url = paths.categoryCounts;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ItemCountsByCategoryResponse.parse(response.data);

        return success(data);
    }
    catch ( error: unknown )
    {
        return convertExceptionToFailure(error);
    }
}

import axios from 'axios';
import { z } from 'zod';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { paths } from '@/rest/paths';
import { DateTime } from '@/datetime';
import { success } from '@/result';


const Item = z.object({
    itemId: z.number(),
    addedAt: DateTime,
    description: z.string(),
    priceInCents: z.number(),
    categoryId: z.number(),
    sellerId: z.number(),
    donation: z.boolean(),
    charity: z.boolean(),
    frozen: z.boolean(),
});

export type Item = z.infer<typeof Item>;


const SuccessResponse = z.object({
    items: z.array(Item),
    totalItemCount: z.number().nonnegative(),
});

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function listItems(start: number, count: number): Promise<RestResult<SuccessResponse>>
{
    const url = paths.itemsRange(start, count);

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success({ items: data.items, totalItemCount: data.totalItemCount });
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}

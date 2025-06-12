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
    soldIn: z.array(z.number()),
});

export type Item = z.infer<typeof Item>;


const SuccessResponse = Item;

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function getItemInformation(itemId: number): Promise<RestResult<SuccessResponse>>
{
    const url = paths.item(itemId);

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success(data);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}

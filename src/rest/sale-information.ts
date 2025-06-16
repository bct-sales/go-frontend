import { DateTime } from '@/datetime';
import { paths } from '@/rest/paths';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';


const Item = z.object({
    itemId: z.number(),
    sellerId: z.number(),
    description: z.string(),
    priceInCents: z.number(),
    categoryId: z.number(),
    donation: z.boolean(),
    charity: z.boolean(),
});

export type Item = z.infer<typeof Item>;


const Sale = z.object({
    cashierId: z.number(),
    transactionTime: DateTime,
    items: z.array(Item),
});

export type Sale = z.infer<typeof Sale>;

const SuccessResponse = Sale;

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function getSaleInformation(itemId: number): Promise<RestResult<SuccessResponse>>
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

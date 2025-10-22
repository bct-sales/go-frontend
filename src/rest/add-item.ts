import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';


const Payload = z.object({
    priceInCents: z.number().int().nonnegative(),
    description: z.string().nonempty(),
    categoryId: z.number().int().nonnegative(),
    donation: z.boolean(),
    charity: z.boolean(),
    large: z.boolean(),
}).strict();

export type Payload = z.infer<typeof Payload>;


const SuccessResponse = z.object({
    itemId: z.number().int().nonnegative(),
}).strict();

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function addItem(sellerId: number, payload: Payload ): Promise<RestResult<number>>
{
    const url = paths.sellerItems(sellerId);

    try
    {
        const response = await axios.post<unknown>( url.str(), payload );
        const data = SuccessResponse.parse(response.data);

        return success(data.itemId);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

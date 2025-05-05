import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';


const Payload = z.object({
    priceInCents: z.number().int().nonnegative().optional(),
    description: z.string().nonempty().optional(),
    categoryId: z.number().int().nonnegative().optional(),
    donation: z.boolean().optional(),
    charity: z.boolean().optional(),
}).strict();

export type Payload = z.infer<typeof Payload>;


export async function updateItem(sellerId: number, payload: Payload ): Promise<RestResult<unknown>>
{
    const url = paths.sellerItems(sellerId);

    try
    {
        await axios.post<unknown>( url, payload );

        return success({});
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

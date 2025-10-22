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
    large: z.boolean().optional(),
}).strict();

export type Payload = z.infer<typeof Payload>;


export async function updateItem(itemId: number, payload: Payload ): Promise<RestResult<unknown>>
{
    const url = paths.item(itemId);

    try
    {
        await axios.put<unknown>( url.str(), payload );

        return success({});
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';


const Payload = z.object({
    itemIds: z.array(z.number().int().nonnegative()),
}).strict();

export type Payload = z.infer<typeof Payload>;


const SuccessResponse = z.object({
    saleId: z.number().int().nonnegative(),
}).strict();

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function addSale(payload: Payload ): Promise<RestResult<number>>
{
    const url = paths.sales;

    try
    {
        const response = await axios.post<unknown>( url.str(), payload );
        const data = SuccessResponse.parse(response.data);

        return success(data.saleId);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

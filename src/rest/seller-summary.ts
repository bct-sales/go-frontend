import { paths } from '@/rest/paths';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';


const SuccessResponse = z.object({
    itemCount: z.number().nonnegative(),
    frozenItemCount: z.number().nonnegative(),
    totalPrice: z.number().nonnegative(),
});

export type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function getSellerSummary(userId: number): Promise<RestResult<SuccessResponse>>
{
    const url = paths.user(userId);

    try
    {
        const response = await axios.get<unknown>(url);
        console.log("received", response);
        const data = SuccessResponse.parse(response.data);

        return success(data);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}

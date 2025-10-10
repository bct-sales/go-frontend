import { paths } from '@/rest/paths';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';


const SellerSummary = z.object({
    itemCount: z.number().nonnegative(),
    frozenItemCount: z.number().nonnegative(),
    totalPrice: z.number().nonnegative(),
});

export type SellerSummary = z.infer<typeof SellerSummary>;


export async function getSellerSummary(userId: number): Promise<RestResult<SellerSummary>>
{
    const url = paths.user(userId);

    try
    {
        const response = await axios.get<unknown>(url.str());
        const data = SellerSummary.parse(response.data);

        return success(data);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}

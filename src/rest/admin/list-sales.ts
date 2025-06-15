import axios from 'axios';
import { z } from 'zod';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { paths } from '@/rest/paths';
import { DateTime } from '@/datetime';
import { success } from '@/result';


const Sale = z.object({
    saleId: z.number().nonnegative(),
	cashierId: z.number().nonnegative(),
	transactionTime: DateTime,
	itemCount: z.number().nonnegative(),
	totalPriceInCents: z.number().nonnegative(),
});

export type Sale = z.infer<typeof Sale>;


const SuccessResponse = z.object({
    sales: z.array(Sale),
});

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function listSales(): Promise<RestResult<SuccessResponse>>
{
    const url = paths.sales;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success({ sales: data.sales });
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}

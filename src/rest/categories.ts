import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';


const Category = z.object({
    categoryId: z.number().int().nonnegative(),
    categoryName: z.string().nonempty(),
})

export type Category = z.infer<typeof Category>;

const SuccessResponse = z.object({
    counts: z.array(Category),
});

type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function getItemCategories(): Promise<RestResult<SuccessResponse>>
{
    const url = paths.categories;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success(data);
    }
    catch ( error: unknown )
    {
        return convertExceptionToFailure(error);
    }
}

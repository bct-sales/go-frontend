import axios from 'axios';
import { z } from 'zod';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { paths } from '@/rest/paths';
import { DateTime } from '@/datetime';
import { success } from '@/result';
import { URL } from './paths';


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
});

export type Item = z.infer<typeof Item>;


const SuccessResponse = z.object({
    items: z.array(Item),
    totalItemCount: z.number().nonnegative(),
    totalItemValue: z.number().nonnegative(),
});

export type SuccessResponse = z.infer<typeof SuccessResponse>;

export type Options = {
    rowRange?: { start: number, count: number };
    descriptionFilter?: string;
};

export async function listItems(options: Options): Promise<RestResult<SuccessResponse>>
{
    const url = buildUrl();

    try
    {
        const response = await axios.get<unknown>(url.str());
        const data = SuccessResponse.parse(response.data);

        return success(data);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }


    function buildUrl(): URL
    {
        let url = paths.items;

        if ( options.rowRange )
        {
            url = url.withRowRange(options.rowRange.start, options.rowRange.count);
        }

        if ( options.descriptionFilter )
        {
            url = url.withDescriptionFilter(options.descriptionFilter);
        }

        return url;
    }
}

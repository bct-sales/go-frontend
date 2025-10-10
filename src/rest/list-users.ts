import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { paths } from '@/rest/paths';
import { DateTime } from '@/datetime';


const User = z.object({
    id: z.number(),
    password: z.string(),
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
    createdAt: DateTime,
    lastActivity: z.optional(DateTime),
    itemCount: z.number(),
});

export type User = z.infer<typeof User>;


const SuccessResponse = z.object({
    users: z.array(User),
})

type SuccessResponse = z.infer<typeof SuccessResponse>;

export async function listUsers(): Promise<RestResult<User[]>>
{
    const url = paths.users;

    try
    {
        const response = await axios.get<unknown>(url.str());
        const data = SuccessResponse.parse(response.data);

        return success(data.users);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

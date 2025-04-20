import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { success } from '@/result';
import axios from 'axios';
import { z } from 'zod';
import { Timestamp } from '../datetime';
import { paths } from '../paths';


const User = z.object({
    id: z.number(),
    password: z.string(),
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
    created_at: Timestamp,
    last_activity: z.optional(Timestamp),
    item_count: z.number(),
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
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success(data.users);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

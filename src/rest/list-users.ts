import axios from 'axios';
import { z } from 'zod';
import { extractDetailFromException } from './errors';
import { paths } from './paths';


const User = z.object({
    id: z.number(),
    password: z.string(),
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
    created_at: z.object({
        year: z.number(),
        month: z.number(),
        day: z.number(),
        hour: z.number(),
        minute: z.number(),
        second: z.number(),
    }),
});

export type User = z.infer<typeof User>;


const ListUsersResponse = z.object({
    users: z.array(User),
})

type ListUsersResponse = z.infer<typeof ListUsersResponse>;


export async function listUsers(): Promise<User[] | undefined>
{
    const url = paths.users;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ListUsersResponse.parse(response.data);

        return data.users;
    }
    catch ( error: unknown )
    {
        const detail = extractDetailFromException(error);

        if ( detail !== null )
        {
            return undefined;
        }
        else
        {
            console.error(error);
            return undefined;
        }
    }
}

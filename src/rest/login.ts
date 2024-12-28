import { Role } from '@/role';
import axios from 'axios';
import { z } from 'zod';
import { extractDetailFromException } from './errors';
import { paths } from './paths';



const LoginParameters = z.object({
    userId: z.number(),
    password: z.string(),
});

export type LoginParameters = z.infer<typeof LoginParameters>;


const LoginSuccessResponse = z.object({
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
}).strict();

type LoginSuccessResponse = z.infer<typeof LoginSuccessResponse>;


export async function login( data: LoginParameters ): Promise<Role | undefined>
{
    const payload = {
        grant_type: 'password',
        username: `${data.userId}`,
        password: data.password
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const url = paths.login;

    try
    {
        const response = await axios.post<unknown>( url, payload, { headers } );
        const data = LoginSuccessResponse.parse(response.data);

        return data.role;
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

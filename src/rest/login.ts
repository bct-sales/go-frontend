import { success } from '@/result';
import { Role } from '@/role';
import axios from 'axios';
import { z } from 'zod';
import { paths } from './paths';
import { convertExceptionToFailure, RestResult } from './result';



const LoginParameters = z.object({
    userId: z.number(),
    password: z.string(),
});

export type LoginParameters = z.infer<typeof LoginParameters>;


const LoginSuccessResponse = z.object({
    role: z.union([
        z.literal('seller'),
        z.literal('admin'),
        z.literal('cashier')
    ]),
}).strict();

type LoginSuccessResponse = z.infer<typeof LoginSuccessResponse>;


export async function login( data: LoginParameters ): Promise<RestResult<Role>>
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

        return success(data.role);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}

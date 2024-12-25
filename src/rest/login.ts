import axios from 'axios';
import { z } from 'zod';



const LoginParameters = z.object({
    userId: z.number(),
    password: z.string(),
});

export type LoginParameters = z.infer<typeof LoginParameters>;


const LoginResponse = z.object({
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
}).strict();

type LoginResponse = z.infer<typeof LoginResponse>;


export async function login( data: LoginParameters ): Promise<boolean>
{
    const payload = {
        grant_type: 'password',
        username: `${data.userId}`,
        password: data.password
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const url = `${ROOT_URL}/login`;

    try
    {
        const response = await axios.post<unknown>( url, payload, { headers } );
        const data = LoginResponse.parse(response.data);

        console.log(data);

        return true;
        // const accessToken = data.access_token;
        // const role = data.role;
        // const userId = data.user_id;

        // return success({ role, accessToken, userId });
    }
    catch ( error: unknown )
    {
        // const detail = extractDetailFromException(error);

        // if ( detail !== null )
        // {
        //     return failure<string>(detail);
        // }
        // else
        // {
        //     console.error(error);
        //     return failure<string>('Unknown error');
        // }
        console.error(error);
        return false;
    }
}

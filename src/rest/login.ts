import { Role } from '@/role';
import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor, InvalidIdError, invalidIdErrorTag, NoSuchUserError, noSuchUserErrorTag, UnknownError, unknownErrorTag, WrongPasswordError, wrongPasswordErrorTag } from './errors';
import { paths } from './paths';
import { failure, Result, success } from '@/result';



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

const LoginFailureResponse = z.discriminatedUnion("type",
    [
        InvalidIdError,
        NoSuchUserError,
        WrongPasswordError,
        UnknownError,
    ]
);

type LoginFailureResponse = z.infer<typeof LoginFailureResponse>;

const extractError = createErrorExtractor<LoginFailureResponse>(LoginFailureResponse, (message: string) => ({ type: "unknown", details: message }));

export enum LoginError {
    InvalidId,
    UnknownUser,
    WrongPassword,
    Unknown
}

export async function login( data: LoginParameters ): Promise<Result<Role, LoginError>>
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
    catch ( error: unknown )
    {
        const errorData = extractError(error);

        switch ( errorData.type )
        {
            case invalidIdErrorTag:
                return failure(LoginError.InvalidId);
            case noSuchUserErrorTag:
                return failure(LoginError.UnknownUser);
            case wrongPasswordErrorTag:
                return failure(LoginError.WrongPassword);
            case unknownErrorTag:
                return failure(LoginError.Unknown);
        }
    }
}

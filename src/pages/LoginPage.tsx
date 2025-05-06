import { useAuthentication } from '@/authentication';
import Delayed from '@/components/Delayed';
import * as rest from '@/rest/login';
import { Box, Button, Center, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from '@mantine/notifications';
import React from "react";
import { useNavigate } from "react-router-dom";


interface FormFields
{
    userId: string;
    password: string;
}

export default function LoginPage()
{
    const authentication = useAuthentication();
    const navigate = useNavigate();
    const form = useForm<FormFields>({
        initialValues: {
            userId: '',
            password: ''
        },
        validate: {
            userId: login => isValidLogin(login) ? null : "Enter a series of digits",
            password: password => (isValidPassword(password) ? null : "Enter a password"),
        }
    });

    if ( authentication.status === 'authenticated' )
    {
        return (
            <Delayed delayInMilliseconds={500}>
                <Center mih='50vh'>
                    <Box maw={500} mx="auto" w='40%'>
                        <h1>Bug!</h1>
                    </Box>
                </Center>
            </Delayed>
        );
    }

    return (
        <>
            <Center mih='50vh'>
                <Box maw={500} mx="auto" w='40%'>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        <Center>
                            <Box miw='20em'>
                                {renderLoginInput()}
                                {renderPasswordInput()}
                            </Box>
                        </Center>

                        <Button type="submit">Login</Button>
                    </form>
                </Box>
            </Center>
        </>
    );


    function renderLoginInput(): React.ReactNode
    {
        return (
            <TextInput label="Your ID" placeholder="Number" {...form.getInputProps('userId')} p='sm' />
        );
    }

    function renderPasswordInput(): React.ReactNode
    {
        return (
            <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} p='sm' />
        );
    }

    function isValidLogin(login: string): boolean
    {
        return /^\d+$/.test(login);
    }

    function isValidPassword(password: string): boolean
    {
        return password.length > 0;
    }

    function onSubmit(formFields: FormFields)
    {
        void (async () => {
            const userId = parseInt(formFields.userId);
            const password = formFields.password;
            const authenticationParameters: rest.LoginParameters = { userId, password };

            const result = await rest.login(authenticationParameters);

            if ( result.success )
            {
                const role = result.value

                if ( authentication.status === 'authenticated' )
                {
                    console.error("Bug! User is already authenticated!");
                    return;
                }

                authentication.login(userId, role);

                switch ( role )
                {
                    case 'admin':
                        navigate('/admin');
                        return;
                    case 'seller':
                        navigate('/seller');
                        return;
                    case 'cashier':
                        navigate('/cashier');
                        return;
                }
            }
            else
            {
                switch ( result.error.type )
                {
                    case "invalid_id":
                        notifications.show({title: 'Invalid ID', message: 'Invalid ID', color: 'red'});
                        return;
                    case "no_such_user":
                        notifications.show({title: 'Unknown user', message: 'User does not exist', color: 'red'});
                        return;
                    case "wrong_password":
                        notifications.show({title: 'Invalid password', message: 'Wrong password', color: 'red'});
                        return;
                    default:
                        notifications.show({title: 'Unexpected error!', message: 'Please report this to the site administrator', color: 'red'});
                        return;
                }
            }
        })();
    }
}

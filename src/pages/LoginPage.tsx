import * as rest from '@/rest/login';
import { Box, Button, Center, Group, Modal, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";


interface FormFields
{
    userId: string;
    password: string;
}

export default function LoginPage()
{
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

    // React.useEffect(() => {
    //     if ( auth.isAuthenticated() )
    //     {
    //         navigate('/');
    //     }
    // });

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
            const authenticationParameters: rest.LoginParameters = {
                userId: parseInt(formFields.userId),
                password: formFields.password,
            };

            const role = await rest.login(authenticationParameters);

            if ( role )
            {
                switch ( role )
                {
                    case 'admin':
                        navigate('/admin');
                        break;
                    case 'seller':
                        navigate('/seller');
                        break;
                    case 'cashier':
                        navigate('/cashier');
                        break;
                }
            }
            else
            {
                console.log('Login failed');
            }

            // if ( result.success )
            // {
            //     const { userId, role, accessToken } = result.value;

            //     if ( !auth.isAuthenticated() )
            //     {
            //         auth.login({ role, accessToken, userId });

            //         navigate("/");
            //     }
            //     else
            //     {
            //         console.error('Bug detected: user should not be able to reach login page while authenticated');
            //         setMessage('You have encountered a bug');
            //         openMessageBox();
            //     }
            // }
            // else
            // {
            //     setMessage(result.error);
            //     openMessageBox();
            // }
        })();
    }
}

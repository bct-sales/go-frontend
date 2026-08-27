import { Center, MantineProvider, Stack } from '@mantine/core';
import React from 'react';


export default function TechnicalIssues() : React.ReactElement
{
    return (
        <MantineProvider defaultColorScheme="dark">
            <Stack>
                <Center>
                    Due to some technical problems, the site is temporarily down.
                    We expect the issues to be resolved by 30 August.
                </Center>
                <Center>
                    Our apologies for the inconvenience.
                </Center>
            </Stack>
        </MantineProvider>
    );
}

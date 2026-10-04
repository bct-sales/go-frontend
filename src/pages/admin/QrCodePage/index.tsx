import { Accordion, Anchor, Grid, Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import classes from './QrCodePage.module.css';
import QRCode from "react-qr-code";

export default function QrCodePage() : React.ReactElement
{
    return (
        <Stack>
            <Title m="xl">Useful QR Codes</Title>

            <Grid align="stretch" justify='center'>
                {renderSpecialQrCode("Factory settings", 0)}
                {renderSpecialQrCode("Quiet mode", 45)}
                {renderSpecialQrCode("No terminator", 50)}
            </Grid>
        </Stack>
    );


    function renderQrCode(caption: string, value: string): React.ReactNode
    {
        return (
            <Stack align='center' m='sm' p='sm' bg='#151515'>
                <Title>{caption}</Title>
                <Group m='sm' p='sm' w='128px' bg='white'>
                    <QRCode value={value} style={{height: 'auto'}} />
                </Group>
            </Stack>
        )
    }

    function renderSpecialQrCode(caption: string, code: number): React.ReactNode
    {
        const codeString = `{code}`.padStart(2, '0')
        return renderQrCode(caption, `$Set#Code^{code}`)
    }
}
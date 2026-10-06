import { Card, Grid, Group, Slider, Stack, Title } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import QRCode from 'react-qr-code';
import classes from './QrCodePage.module.css';

type CodeId = 'wired-factory-reset' | 'wired-quiet' | 'wired-no-terminator'

export default function QrCodePage() : React.ReactElement
{
    const [ highlightedCode, setHighlightedCode ] = useState<CodeId | undefined>(undefined);
    const [ qrCodeSize, setQrCodeSize ] = useState<number>(128);

    // Gotten from https://www.sycreader.com/wp-content/uploads/2022/02/2022020803064788.pdf
    return (
        <Stack>
            <Slider value={qrCodeSize} min={64} max={256} onChange={setQrCodeSize} />
            <Card>
                <Title>Wired Scanners</Title>

                <Grid align="stretch" justify="center">
                    {renderSpecialQrCode('Factory settings', 0, 'wired-factory-reset', highlightedCode)}
                    {renderSpecialQrCode('Quiet mode', 45, 'wired-quiet', highlightedCode)}
                    {renderSpecialQrCode('No terminator', 50, 'wired-no-terminator', highlightedCode)}
                </Grid>
            </Card>
        </Stack>
    );


    function renderQrCode(caption: string, value: string, id: CodeId, highlightedId: CodeId | undefined): React.ReactNode
    {
        const isVisible = highlightedId === undefined || id === highlightedId;
        const opacity = isVisible ? 1 : 0.10;
        const size = `${qrCodeSize}px`;

        return (
            <Stack align="center" m="xl" className={classes.codeBox} onClick={onClick}>
                <Title order={3} className={classes.caption}>{caption}</Title>
                <Group m="sm" p="sm" w={size} bg="white">
                    <QRCode value={value} style={{height: 'auto', opacity}} />
                </Group>
            </Stack>
        );


        function onClick()
        {
            if ( highlightedCode !== id )
            {
                setHighlightedCode(id);
            }
            else
            {
                setHighlightedCode(undefined);
            }
        }
    }

    function renderSpecialQrCode(caption: string, code: number, id: CodeId, highlightedId: CodeId | undefined): React.ReactNode
    {
        const codeString = `$Set#Code^${code}`.padStart(2, '0');

        return renderQrCode(caption, codeString, id, highlightedId);
    }
}
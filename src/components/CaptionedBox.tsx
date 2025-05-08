import { Collapse, Group, Stack, Text } from '@mantine/core';
import classes from './CaptionedBox.module.css';
import { useState } from 'react';


interface Props
{
    caption: string;
    children: React.ReactNode;
}

export default function CaptionedBox(props: Props): React.ReactNode
{
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Stack className={classes.container} gap={0}>
            <Group className={classes.captionContainer} onClick={() => setCollapsed(!collapsed)} justify='stretch'>
                <Text className={classes.caption}>{props.caption}</Text>
            </Group>
            <Collapse in={collapsed} transitionDuration={250}>
                <div className={classes.childContainer}>
                    {props.children}
                </div>
            </Collapse>
        </Stack>
    );
}
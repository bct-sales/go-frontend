import { Collapse, Group, Stack, Text } from '@mantine/core';
import { IconCircleChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './CaptionedBox.module.css';


interface Props
{
    caption: string;
    children: React.ReactNode;
    collapsable?: boolean;
}

export default function CaptionedBox(props: Props): React.ReactNode
{
    const [collapsed, setCollapsed] = useState(false);
    const isCollapsed = collapsed || !props.collapsable;

    return (
        <Stack className={classes.container} gap={0}>
            <Group className={classes.captionContainer} onClick={() => setCollapsed(!collapsed)} justify='stretch' style={{position: 'relative'}}>
                {renderCollapseIcon()}
                <Text className={classes.caption}>{props.caption}</Text>
            </Group>
            <Collapse in={isCollapsed} transitionDuration={250}>
                <div className={classes.childContainer}>
                    {props.children}
                </div>
            </Collapse>
        </Stack>
    );


    function renderCollapseIcon(): React.ReactNode
    {
        if (props.collapsable)
        {
            return (
                <IconCircleChevronDown style={{position: 'absolute', right: '2px', height: '100%'}} />
            );
        }
        else
        {
            return null;
        }
    }
}
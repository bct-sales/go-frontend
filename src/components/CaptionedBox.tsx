import { Stack, Text } from '@mantine/core';
import classes from './CaptionedBox.module.css';


interface Props
{
    caption: string;
    children: React.ReactNode;
}

export default function CaptionedBox(props: Props): React.ReactNode
{
    return (
        <Stack className={classes.container} gap={0}>
            <Text className={classes.caption}>{props.caption}</Text>
            <div className={classes.childContainer}>
                {props.children}
            </div>
        </Stack>
    );
}
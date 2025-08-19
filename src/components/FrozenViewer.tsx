import { Tooltip } from "@mantine/core";
import { IconSquareKey } from "@tabler/icons-react";

interface Props
{
    value: boolean;
}


export default function FrozenViewer(props: Props): React.ReactNode
{
    const { value } = props;

    if ( value )
    {
        return (
            <Tooltip label="This item is frozen and cannot be edited" openDelay={500}>
                <IconSquareKey />
            </Tooltip>
        );
    }
    else
    {
        return <></>;
    }
};
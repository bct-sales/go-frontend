import { Tooltip } from "@mantine/core";
import LargeItemIcon from "./LargeItemIcon";

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
            <Tooltip label="This is a large item." openDelay={500}>
                <LargeItemIcon />
            </Tooltip>
        );
    }
    else
    {
        return <></>;
    }
};
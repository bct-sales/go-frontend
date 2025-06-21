import { Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";

interface Props
{
    value: boolean;
}


export default function CharityViewer(props: Props): React.ReactNode
{
    const { value } = props;

    if ( value )
    {
        return (
            <Tooltip label="This item will be donated to charity in case it does not get sold.">
                <IconHeartFilled />
            </Tooltip>
        );
    }
    else
    {
        return <></>;
    }
};
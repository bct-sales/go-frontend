import { Tooltip } from "@mantine/core";
import { IconGiftFilled } from "@tabler/icons-react";

interface Props
{
    value: boolean;
}


export default function DonationViewer(props: Props): React.ReactNode
{
    const { value } = props;

    if ( value )
    {
        return (
            <Tooltip label="If this item gets sold, the proceeds will go to the BCT.">
                <IconGiftFilled />
            </Tooltip>
        );
    }
    else
    {
        return <></>;
    }
};
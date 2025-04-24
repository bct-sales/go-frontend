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
            <IconGiftFilled />
        );
    }
    else
    {
        return <></>;
    }
};
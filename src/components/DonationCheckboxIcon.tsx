import { IconGift } from "@tabler/icons-react";


interface Props
{
    indeterminate?: boolean;
    className?: string;
}

export default function DonationCheckboxIcon(props: Props): React.ReactNode
{
    return (
        <IconGift className={props.className} />
    );
}
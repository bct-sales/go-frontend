import { IconArrowsMaximize } from "@tabler/icons-react";


interface Props
{
    indeterminate?: boolean;
    className?: string;
}

export default function LargeItemIcon(props: Props): React.ReactNode
{
    return (
        <IconArrowsMaximize className={props.className} />
    );
}
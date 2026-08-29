import { IconHeart } from '@tabler/icons-react';


interface Props
{
    indeterminate?: boolean;
    className?: string;
}

export default function CharityCheckboxIcon(props: Props): React.ReactElement
{
    return (
        <IconHeart className={props.className} />
    );
}
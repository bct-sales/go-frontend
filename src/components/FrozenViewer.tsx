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
            <IconSquareKey />
        );
    }
    else
    {
        return <></>;
    }
};
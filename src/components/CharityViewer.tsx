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
            <IconHeartFilled />
        );
    }
    else
    {
        return <></>;
    }
};
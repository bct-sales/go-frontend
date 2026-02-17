import React from "react";


interface Props
{
    show: boolean;
    children?: React.ReactElement;
}

export default function ShowIf(props: Props): React.ReactNode
{
    if ( props.show )
    {
        return props.children;
    }
    else
    {
        return <></>;
    }
}

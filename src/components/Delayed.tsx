import { useEffect, useState } from "react";


interface Props
{
    delayInMilliseconds: number;
    children: React.ReactNode;
}

export default function Delayed(props: Props): React.ReactNode
{
    const [show, setShow] = useState(false);

    useEffect(() =>
    {
        const timer = setTimeout(() => setShow(true), props.delayInMilliseconds);
        return () => clearTimeout(timer);
    }, [props.delayInMilliseconds]);

    if ( show )
    {
        return <>{props.children}</>;
    }
    else
    {
        return <></>;
    }
}
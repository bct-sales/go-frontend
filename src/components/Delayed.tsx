import { useEffect, useState } from "react";


interface Props
{
    delay: number;
    children: React.ReactNode;
}

export default function Delayed(props: Props): React.ReactNode
{
    const [show, setShow] = useState(false);

    useEffect(() =>
    {
        const timer = setTimeout(() => setShow(true), props.delay);
        return () => clearTimeout(timer);
    }, [props.delay]);

    if ( show )
    {
        return <>{props.children}</>;
    }
    else
    {
        return <></>;
    }
}
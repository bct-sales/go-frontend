import { useEffect, useState } from 'react';


interface Props
{
    delayInMilliseconds: number;
    children: React.ReactElement;
}

export default function Delayed(props: Props): React.ReactElement
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
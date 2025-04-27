import { Flex, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props
{
    delayInMilliseconds: number;
    message?: string;
}

const DEFAULT_DELAY_IN_MILLISECONDS = 250;

export default function Loading(props: Props): React.ReactNode
{
    const [visible, setVisible] = useState(false);
    const delayInMilliseconds = props.delayInMilliseconds || DEFAULT_DELAY_IN_MILLISECONDS;

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setVisible(true);
        }, delayInMilliseconds);

        return () => {
            clearTimeout(timeOut);
        };
    }, [visible, delayInMilliseconds]);

    if ( visible )
    {
        return (
            <Flex justify="center" align="center" direction="column">
                {renderMessage()}
                <Loader type="dots" color="blue" size="xl" />
            </Flex>
        );
    }
    else
    {
        return <></>;
    }


    function renderMessage(): React.ReactNode
    {
        if ( props.message )
        {
            return (
                <Text size="xl">
                    {props.message}
                </Text>
            );
        }
        else
        {
            return <></>;
        }
    }
}
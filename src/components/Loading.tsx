import { Flex, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Delayed from "./Delayed";

interface Props
{
    delayInMilliseconds?: number;
    message?: string;
}

const DEFAULT_DELAY_IN_MILLISECONDS = 100;

export default function Loading(props: Props): React.ReactNode
{
    const delayInMilliseconds = props.delayInMilliseconds || DEFAULT_DELAY_IN_MILLISECONDS;

    return (
        <Delayed delayInMilliseconds={delayInMilliseconds}>
            <Flex justify="center" align="center" direction="column">
                {renderMessage()}
                <Loader type="dots" color="blue" size="xl" />
            </Flex>
        </Delayed>
    );


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
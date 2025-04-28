import ItemDescriptionEditor from "@/components/ItemDescriptionEditor";
import ItemPriceEditor from "@/components/ItemPriceEditor";
import { Flex } from "@mantine/core";
import { useState } from "react";


export default function AddItemSubpage() : React.ReactNode
{
    const [description, setDescription] = useState<string>('');
    const [priceInCents, setPriceInCents] = useState<number>(50);

    return (
        <Flex direction="column" align="center" justify="center" gap="md" style={{height: '100%'}}>
            <ItemDescriptionEditor description={description} setDescription={setDescription} />
            <ItemPriceEditor priceInCents={priceInCents} setPriceInCents={setPriceInCents} />
        </Flex>
    );
}

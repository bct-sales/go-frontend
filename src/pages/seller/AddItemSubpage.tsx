import CharityEditor from "@/components/CharityEditor";
import DonationEditor from "@/components/DonationEditor";
import ItemCategoryEditor from "@/components/ItemCategoryEditor";
import ItemDescriptionEditor from "@/components/ItemDescriptionEditor";
import ItemPriceEditor from "@/components/ItemPriceEditor";
import { Flex } from "@mantine/core";
import { useState } from "react";


export default function AddItemSubpage() : React.ReactNode
{
    const [description, setDescription] = useState<string>('');
    const [priceInCents, setPriceInCents] = useState<number>(50);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [charity, setCharity] = useState<boolean>(false);
    const [donation, setDonation] = useState<boolean>(false);

    return (
        <Flex direction="column" align="stretch" justify="center" gap="md" style={{height: '100%'}}>
            <ItemDescriptionEditor description={description} setDescription={setDescription} />
            <ItemPriceEditor priceInCents={priceInCents} setPriceInCents={setPriceInCents} />
            <ItemCategoryEditor categoryId={categoryId} setCategoryId={setCategoryId} />
            <CharityEditor charity={charity} setCharity={setCharity} />
            <DonationEditor donation={donation} setDonation={setDonation} />
        </Flex>
    );
}

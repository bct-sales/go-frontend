import CharityEditor from "@/components/CharityEditor";
import DonationEditor from "@/components/DonationEditor";
import ItemCategoryEditor from "@/components/ItemCategoryEditor";
import ItemDescriptionEditor from "@/components/ItemDescriptionEditor";
import ItemPriceEditor from "@/components/ItemPriceEditor";
import { validateDescription, validatePrice } from "@/validation";
import { Button, Flex } from "@mantine/core";
import { useState } from "react";


export default function AddItemSubpage() : React.ReactNode
{
    const [description, setDescription] = useState<string>('');
    const [priceInCents, setPriceInCents] = useState<number>(50);
    const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
    const [charity, setCharity] = useState<boolean>(false);
    const [donation, setDonation] = useState<boolean>(false);
    const isValidData = checkValidity();

    return (
        <Flex direction="column" align="stretch" justify="center" gap='md' w='400px'>
            <ItemDescriptionEditor description={description} setDescription={setDescription} />
            <ItemPriceEditor priceInCents={priceInCents} setPriceInCents={setPriceInCents} quickButtons={[100, 200, 500, 1000]} />
            <ItemCategoryEditor categoryId={categoryId} setCategoryId={setCategoryId} />
            <CharityEditor charity={charity} setCharity={setCharity} />
            <DonationEditor donation={donation} setDonation={setDonation} />
            <Button mt='xl' onClick={addItem} disabled={!isValidData}>Add Item</Button>
        </Flex>
    );


    function addItem(): void
    {
        console.log('Adding item with the following details:');
        console.log('Description:', description);
        console.log('Price in cents:', priceInCents);
        console.log('Category ID:', categoryId);
        console.log('Charity:', charity);
        console.log('Donation:', donation);
    }

    function checkValidity(): boolean
    {
        if ( !validateDescription(description).isValid )
        {
            return false;
        }

        if ( !validatePrice(priceInCents).isValid )
        {
            return false;
        }

        if ( categoryId === undefined )
        {
            return false;
        }

        return true;
    }
}

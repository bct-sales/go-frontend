import CharityEditor from "@/components/CharityEditor";
import DonationEditor from "@/components/DonationEditor";
import ItemCategoryEditor from "@/components/ItemCategoryEditor";
import ItemDescriptionEditor from "@/components/ItemDescriptionEditor";
import ItemPriceEditor from "@/components/ItemPriceEditor";
import { addItem, Payload } from "@/rest/add-item";
import { validateDescription, validatePrice } from "@/validation";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface Props
{
    sellerId: number;
}

export default function AddItemSubpage(props: Props) : React.ReactNode
{
    const navigate = useNavigate();
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
            <Button mt='xl' onClick={onAddItem} disabled={!isValidData}>Add Item</Button>
        </Flex>
    );


    function onAddItem(): void
    {
        void (async () => {
            const payload: Payload = {
                description,
                priceInCents,
                categoryId: categoryId!,
                charity,
                donation,
            };

            const response = await addItem(props.sellerId, payload);

            if ( response.success )
            {
                notifications.show({
                    message: `Item successfully added!`,
                    color: 'green',
                });

                navigate('/seller');
            }
            else
            {
                notifications.show({
                    title: 'Failed to add item',
                    message: `${response.error.details} (tag ${response.error.type})`,
                    color: 'red',
                });
            }
        })();
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

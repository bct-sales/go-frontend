import { Button, Flex } from "@mantine/core";
import ItemDescriptionEditor from "./ItemDescriptionEditor";
import ItemPriceEditor from "./ItemPriceEditor";
import ItemCategoryEditor from "./ItemCategoryEditor";
import CharityEditor from "./CharityEditor";
import DonationEditor from "./DonationEditor";

interface Props
{
    itemData: ItemData;
    setItemData: (data: ItemData) => void;
}

export interface ItemData
{
    description: string;
    priceInCents: number;
    categoryId: number | undefined;
    charity: boolean;
    donation: boolean;
}

export default function ItemEditor(props: Props): React.ReactNode
{
    const { description, priceInCents, categoryId, charity, donation } = props.itemData;

    return (
        <Flex direction="column" align="stretch" justify="center" gap='md'>
            <ItemDescriptionEditor description={description} setDescription={setDescription} />
            <ItemPriceEditor priceInCents={priceInCents} setPriceInCents={setPriceInCents} quickButtons={[100, 200, 500, 1000]} />
            <ItemCategoryEditor categoryId={categoryId} setCategoryId={setCategoryId} />
            <CharityEditor charity={charity} setCharity={setCharity} />
            <DonationEditor donation={donation} setDonation={setDonation} />
        </Flex>
    );


    function setDescription(description: string): void
    {
        props.setItemData({ ...props.itemData, description });
    }

    function setPriceInCents(priceInCents: number): void
    {
        props.setItemData({ ...props.itemData, priceInCents });
    }

    function setCategoryId(categoryId: number): void
    {
        props.setItemData({ ...props.itemData, categoryId });
    }

    function setCharity(charity: boolean): void
    {
        props.setItemData({ ...props.itemData, charity });
    }

    function setDonation(donation: boolean): void
    {
        props.setItemData({ ...props.itemData, donation });
    }
}
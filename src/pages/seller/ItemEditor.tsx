import { Flex } from "@mantine/core";
import DonationEditor from "@/components/DonationEditor";
import ItemCategoryEditor from "@/components/ItemCategoryEditor";
import ItemDescriptionEditor from "@/components/ItemDescriptionEditor";
import ItemPriceEditor from "@/components/ItemPriceEditor";
import LargeItemEditor from "@/components/LargeItemEditor";


interface Props
{
    itemData: ItemData;
    setItemData: (data: ItemData) => void;
}

export interface ItemData
{
    description: string;
    priceInCents: number;
    categoryId: number | null;
    charity: boolean;
    donation: boolean;
    large: boolean;
}

export default function ItemEditor(props: Props): React.ReactNode
{
    const { description, priceInCents, categoryId, donation, large } = props.itemData;

    return (
        <Flex direction="column" align="stretch" justify="center" gap='md'>
            <ItemDescriptionEditor description={description} setDescription={setDescription} />
            <ItemPriceEditor priceInCents={priceInCents} setPriceInCents={setPriceInCents} quickButtons={[100, 200, 500, 1000]} />
            <ItemCategoryEditor categoryId={categoryId} setCategoryId={setCategoryId} />
            <DonationEditor donation={donation} setDonation={setDonation} />
            <LargeItemEditor isLarge={large} setIsLarge={setLarge} />
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

    function setDonation(donation: boolean): void
    {
        props.setItemData({ ...props.itemData, donation });
    }

    function setLarge(large: boolean): void
    {
        props.setItemData({ ...props.itemData, large });
    }
}
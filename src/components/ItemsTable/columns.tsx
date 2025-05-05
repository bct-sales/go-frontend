import { Column, Item } from "./ItemsTable";
import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import classes from './ItemsTable.module.css';
import FrozenViewer from "../FrozenViewer";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@mantine/core";


export const itemIdColumn: Column = {
    header: 'Id',
    className: 'item-id',
    viewer: (item: Item) => item.itemId,
};

export const descriptionColumn: Column = {
    header: 'Description',
    className: classes.itemDescription,
    viewer: (item: Item) => item.description,
};

export const addedAtColumn: Column = {
    header: "Added At",
    className: classes.itemAddedAt,
    viewer: (item: Item) => <DateTimeViewer dateTime={item.addedAt} />,
};

export const priceInCentsColumn: Column = {
    header: 'Price',
    className: classes.itemPrice,
    viewer: (item: Item) => <Price priceInCents={item.priceInCents} />,
};

export const charityColumn: Column = {
    header: 'Charity',
    className: classes.itemCharity,
    viewer: (item: Item) => <CharityViewer value={item.charity} />,
};

export const donationColumn: Column = {
    header: 'Donation',
    className: classes.itemDonation,
    viewer: (item: Item) => <DonationViewer value={item.donation} />,
};

export const categoryColumn: Column = {
    header: 'Category',
    className: classes.itemCategory,
    viewer: (item: Item) => <CategoryViewer categoryId={item.categoryId} />,
};

export const sellerColumn: Column = {
    header: 'Seller',
    className: classes.itemSeller,
    viewer: (item: Item) => <UserIdViewer userId={item.sellerId} />,
};

export function editColumn(onClick: (item: Item) => void): Column
{
    return {
        header: '',
        className: classes.itemEdit,
        viewer: (item: Item) => {
            if (item.frozen) {
                return (
                    <FrozenViewer value={item.frozen} />
                )
            }
            else
            {
                return (
                    <Button onClick={() => onClick(item)} variant="subtle">
                        <IconEdit />
                    </Button>
                );
            }
        },
    };
}
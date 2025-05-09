import { Column, Item } from "./ItemsTable";
import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import classes from './ItemsTable.module.css';
import FrozenViewer from "../FrozenViewer";
import { IconCopy, IconCopyPlus, IconEdit } from "@tabler/icons-react";
import { Button, Checkbox } from "@mantine/core";
import NumberInput from "@/components/NumberInput";


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

export function copyColumn(onClick: (item: Item) => void): Column
{
    return {
        header: '',
        className: classes.itemCopy,
        viewer: (item: Item) => {
            return (
                <Button onClick={() => onClick(item)} variant="subtle">
                    <IconCopyPlus />
                </Button>
            );
        },
    };
}

export function selectionColumn(isSelected: (item: Item) => boolean, onChangeSelected: (item: Item, selected: boolean) => void): Column
{
    return {
        header: '',
        className: classes.itemSelect,
        viewer: (item: Item) => {
            return (
                <Checkbox checked={isSelected(item)} onChange={e => onChangeSelected(item, e.currentTarget.checked)} />
            );
        },
    };
}

export function countColumn(count: (item: Item) => number, onChangeCount: (item: Item, count: number) => void): Column
{
    return {
        header: 'Count',
        className: classes.itemCount,
        viewer: (item: Item) => {
            return (
                <NumberInput
                    value={count(item)}
                    onChange={n => onChangeCount(item, n)}
                />
            );
        },
    };
}
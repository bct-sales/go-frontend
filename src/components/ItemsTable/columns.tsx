import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import NumberInput from "@/components/NumberInput";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { range } from "@/util";
import { Button, Checkbox, Group, Tooltip } from "@mantine/core";
import { IconCopyPlus, IconEdit } from "@tabler/icons-react";
import FrozenViewer from "@/components/FrozenViewer";
import { Column, Item } from "./ItemsTable";
import classes from './ItemsTable.module.css';
import SmartSelection from "./SmartSelection";


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
    viewer: (item: Item) => (
        <Group justify="flex-end" w="100%">
            <Price priceInCents={item.priceInCents} />
        </Group>
    ),
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

export const frozenColumn: Column = {
    header: 'Frozen',
    className: classes.itemFrozen,
    viewer: (item: Item) => <FrozenViewer value={item.frozen} />,
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
                    <Tooltip label="Edit item" openDelay={500}>
                        <Button onClick={() => onClick(item)} variant="subtle">
                            <IconEdit />
                        </Button>
                    </Tooltip>
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

export type SmartSelectionColumnArguments =
{
    isSelected: (itemIndex: number) => boolean;
    onChangeSelected: (itemIndex: number, selected: boolean) => void;
    itemCount: number;
    activeItemIndex: number | null;
}

export function smartSelectionColumn(args: SmartSelectionColumnArguments): Column
{
    const { isSelected, onChangeSelected, itemCount, activeItemIndex } = args;

    return {
        header: '',
        className: classes.itemSelect,
        viewer: (_item: Item, itemIndex: number) => {
            return (
                <SmartSelection
                    isSelected={isSelected(itemIndex)}
                    onClickCheckbox={b => onChangeSelected(itemIndex, b)}
                    canSelectUpwards={itemIndex > 0}
                    canSelectDownwards={itemIndex < itemCount - 1}
                    showRangeSelectors={itemIndex === activeItemIndex}
                    onClickDownwards={ctrl => updateRange(itemIndex + 1, itemCount - 1, ctrl)}
                    onClickUpwards={ctrl => updateRange(0, itemIndex - 1, ctrl)} />
            );
        },
    };


    function updateRange(startIndex: number, endIndex: number, ctrl: boolean): void
    {
        for ( const index of range(startIndex, endIndex + 1) )
        {
            const newIsSelected = ctrl ? false : !isSelected(index);
            onChangeSelected(index, newIsSelected);
        }
    }
}

export function countColumn(count: (item: Item) => number, setCount: (item: Item, count: number) => void): Column
{
    return {
        header: 'Count',
        className: classes.itemCount,
        viewer: (item: Item) => {
            return (
                <NumberInput
                    value={count(item)}
                    onChange={n => setCount(item, n)}
                    w='5em'
                    min={0}
                    step={1} />
            );
        },
    };
}
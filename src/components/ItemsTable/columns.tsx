import { Column, Item } from "./ItemsTable";
import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";


export const itemIdColumn: Column = {
    header: 'Id',
    viewer: (item: Item) => item.itemId,
};

export const descriptionColumn: Column = {
    header: 'Description',
    viewer: (item: Item) => item.description,
};

export const addedAtColumn: Column = {
    header: 'Added At',
    viewer: (item: Item) => <DateTimeViewer dateTime={item.addedAt} />,
};

export const priceInCentsColumn: Column = {
    header: 'Price',
    viewer: (item: Item) => <Price priceInCents={item.priceInCents} />,
};

export const charityColumn: Column = {
    header: 'Charity',
    viewer: (item: Item) => <CharityViewer value={item.charity} />,
};

export const donationColumn: Column = {
    header: 'Donation',
    viewer: (item: Item) => <DonationViewer value={item.donation} />,
};

export const categoryColumn: Column = {
    header: 'Category',
    viewer: (item: Item) => <CategoryViewer categoryId={item.categoryId} />,
};

export const sellerColumn: Column = {
    header: 'Seller',
    viewer: (item: Item) => <UserIdViewer userId={item.sellerId} />,
};

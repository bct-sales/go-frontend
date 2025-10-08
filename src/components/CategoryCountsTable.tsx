import { DataTable } from 'mantine-datatable';
import classes from './CategoryCountsTable.module.css';


interface Props
{
    itemCountsByCategory: ItemCount[];
}

export interface ItemCount
{
    categoryId: number;
    categoryName: string;
    count: number;
    soldCount: number;
}

export default function CategoryCountsTable(props: Props): React.ReactNode
{
    const categoryCounts = props.itemCountsByCategory;
    const total = categoryCounts.reduce((acc, curr) => acc + curr.count, 0);
    const totalSold = categoryCounts.reduce((acc, curr) => acc + curr.soldCount, 0);

    return (
        <DataTable
            highlightOnHover
            striped
            records={categoryCounts}
            idAccessor="categoryId"
            columns={[
                {
                    accessor: 'categoryId',
                    title: 'Id',
                    cellsClassName: classes.id,
                    footer: <>Total</>,
                },
                {
                    accessor: 'categoryName',
                    title: 'Category Name',
                    cellsClassName: classes.description,
                },
                {
                    accessor: 'count',
                    title: 'Count',
                    footer: total,
                    cellsClassName: classes.count,
                    footerClassName: classes.count,
                },
                {
                    accessor: 'soldCount',
                    title: '#Sold',
                    footer: totalSold,
                    cellsClassName: classes.count,
                    footerClassName: classes.count,
                },
            ]}
        />
    );
}
import { DataTable } from 'mantine-datatable';
import classes from './CategoryCountsTable.module.css';


interface Props
{
    categoryCounts: Category[];
}

interface Category
{
    categoryId: number;
    categoryName: string;
    count: number;
}

export default function CategoryCountsTable(props: Props): React.ReactNode
{
    const categoryCounts = props.categoryCounts;
    const total = categoryCounts.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <DataTable
            highlightOnHover
            striped
            records={categoryCounts}
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
                }
            ]}
        />
    );
}
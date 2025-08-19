import Price from "@/components/Price";
import { Table } from "@mantine/core";
import classes from './SellerSummaryViewer.module.css';

interface Props
{
    itemCount: number;
    frozenItemCount: number;
    totalPrice: number;
}

export default function SellerSummaryViewer(props: Props) : React.ReactNode
{
    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th className={classes.header}>Item Count</Table.Th>
                    <Table.Td className={classes.value}>{props.itemCount}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.header}>Unlabeled Items</Table.Th>
                    <Table.Td className={classes.value}>{props.itemCount - props.frozenItemCount}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.header}>Total Item's Worth</Table.Th>
                    <Table.Td className={classes.value}><Price priceInCents={props.totalPrice} /></Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

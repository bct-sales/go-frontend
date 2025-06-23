import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { Sale } from "@/rest/sale-information";
import { Table } from "@mantine/core";
import classes from './SaleInformation.module.css';

interface Props
{
    sale: Sale
}

export default function SaleInformation(props: Props): React.ReactNode
{
    const { sale } = props;
    const total = sale.items.reduce((sum, item) => sum + item.priceInCents, 0);

    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th className={classes.key}>Sale ID</Table.Th>
                    <Table.Td className={classes.value}>{sale.saleId}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.key}>Cashier ID</Table.Th>
                    <Table.Td className={classes.value}><UserIdViewer userId={sale.cashierId} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.key}>Transaction Time</Table.Th>
                    <Table.Td className={classes.value}><DateTimeViewer dateTime={sale.transactionTime} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.key}>Item Count</Table.Th>
                    <Table.Td className={classes.value}>{sale.items.length}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th className={classes.key}>Total</Table.Th>
                    <Table.Td className={classes.value}><Price priceInCents={total} /></Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}
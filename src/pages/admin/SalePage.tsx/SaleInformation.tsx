import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { Sale } from "@/rest/sale-information";
import { Table } from "@mantine/core";


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
                    <Table.Th>Sale ID</Table.Th>
                    <Table.Td>{sale.saleId}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Cashier ID</Table.Th>
                    <Table.Td><UserIdViewer userId={sale.cashierId} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Transaction Time</Table.Th>
                    <Table.Td><DateTimeViewer dateTime={sale.transactionTime} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Item Count</Table.Th>
                    <Table.Td>{sale.items.length}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Total</Table.Th>
                    <Table.Td><Price priceInCents={total} /></Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}
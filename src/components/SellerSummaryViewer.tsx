import Price from "@/components/Price";
import { Table } from "@mantine/core";


interface Props
{
    sellerId: number;
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
                    <Table.Th>Seller ID</Table.Th>
                    <Table.Td>{props.sellerId}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Item Count</Table.Th>
                    <Table.Td>{props.itemCount}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Frozen Item Count</Table.Th>
                    <Table.Td>{props.frozenItemCount}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Total Item's Worth</Table.Th>
                    <Table.Td><Price priceInCents={props.totalPrice} /></Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

import CaptionedBox from "@/components/CaptionedBox";
import Price from "@/components/Price";
import { Table } from "@mantine/core";

interface Props
{
    saleCount: number;
    totalSaleValue: number;
}

export default function SaleOverview(props: Props): React.ReactNode
{
    return (
        <CaptionedBox caption="Sales Overview">
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Sale Count</Table.Th>
                        <Table.Td>{props.saleCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Total Sale Value</Table.Th>
                        <Table.Td><Price priceInCents={props.totalSaleValue} /></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </CaptionedBox>
    );
}
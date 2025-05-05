import { Table } from "@mantine/core";


interface Props
{
    sellerId: number;
}

export default function OverviewSubpage(props: Props) : React.ReactNode
{
    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>Seller ID</Table.Th>
                    <Table.Td>{props.sellerId}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

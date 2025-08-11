import CaptionedBox from "@/components/CaptionedBox";
import Price from "@/components/Price";
import { Table } from "@mantine/core";
import classes from './SaleOverview.module.css';

interface Props
{
    saleCount: number;
    totalSaleValue: number;
    itemCount: number;
    distinctSoldItemCount: number;
    totalSoldItemCount: number;
}

export default function SaleOverview(props: Props): React.ReactNode
{
    return (
        <CaptionedBox caption="Sales Overview">
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th className={classes.key}>Sale Count</Table.Th>
                        <Table.Td className={classes.value}>{props.saleCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th className={classes.key}>Total Sale Value</Table.Th>
                        <Table.Td className={classes.value}><Price priceInCents={props.totalSaleValue} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th className={classes.key}>Item Count</Table.Th>
                        <Table.Td className={classes.value}>{props.itemCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th className={classes.key}>Sold Item Count (Distinct)</Table.Th>
                        <Table.Td className={classes.value}>{props.distinctSoldItemCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th className={classes.key}>Sold Item Count (Total)</Table.Th>
                        <Table.Td className={classes.value}>{props.totalSoldItemCount}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </CaptionedBox>
    );
}
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import SellerSummaryViewer from "@/components/SellerSummaryViewer";
import { getSellerSummary, SellerSummary } from "@/rest/seller-summary";
import { RestStatus } from "@/rest/status";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";


interface Props
{
    sellerId: number;
}

export default function OverviewSubpage(props: Props) : React.ReactNode
{
    return (
        <SellerSummaryViewer sellerId={props.sellerId} />
    );
}

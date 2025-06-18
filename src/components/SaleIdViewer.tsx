import { NavLink } from "react-router-dom";

interface Props
{
    saleId: number;
}

export default function SaleIdViewer(props: Props) : React.ReactNode
{
    return (
        <NavLink to={determineSaleUrl(props.saleId)}>{props.saleId}</NavLink>
    )


    function determineSaleUrl(saleId: number): string
    {
        return `/admin/sales/${saleId}`;
    }
}

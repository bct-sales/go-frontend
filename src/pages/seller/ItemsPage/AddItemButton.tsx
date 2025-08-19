import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function AddItemButton(): React.ReactNode
{
    const navigate = useNavigate();

    return (
        <Button onClick={navigateToAddItemPage}>
            Add Item
        </Button>
    );


    function navigateToAddItemPage(): void
    {
        navigate('/seller/add-item');
    }
}
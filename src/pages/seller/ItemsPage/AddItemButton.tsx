import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function AddItemButton(): React.ReactNode
{
    const navigate = useNavigate();

    return (
        <Tooltip label="Add Item" openDelay={500}>
            <ActionIcon
                variant="filled"
                color="blue"
                size="xl"
                onClick={() => navigate('/seller/add-item')}
                title="Add Item">
                <IconPlus />
            </ActionIcon>
        </Tooltip>
    );
}
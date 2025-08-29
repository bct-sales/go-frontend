import { Button, Menu } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";


interface Props
{
    cvsUrl: string;
    jsonUrl: string;
}

export default function DownloadAs(props: Props): React.ReactNode
{
    return (
        <Menu>
            <Menu.Target>
                <Button variant="outline">
                    <IconDownload size={16} stroke={1.5} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item component={Link} to={props.cvsUrl} target="_blank" download="items.csv">
                    CSV
                </Menu.Item>
                <Menu.Item component={Link} to={props.jsonUrl} target="_blank" download="items.json">
                    JSON
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
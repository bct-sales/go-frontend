import { Button, Menu } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";
import { URL } from "@/rest/paths";


interface ExportFormat
{
    caption: string;
    url: URL;
    filename: string;
}

interface Props
{
    formats: ExportFormat[];
}

export default function ExportButton(props: Props): React.ReactNode
{
    return (
        <Menu>
            <Menu.Target>
                <Button variant="outline">
                    <IconDownload size={16} stroke={1.5} />
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {props.formats.map(renderFormatMenuItem)}
            </Menu.Dropdown>
        </Menu>
    );


    function renderFormatMenuItem(format: ExportFormat): React.ReactNode
    {
        return (
            <Menu.Item component={Link} to={format.url.toString()} target="_blank" download={format.filename}>
                {format.caption}
            </Menu.Item>
        );
    }
}
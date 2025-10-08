import { useAuthentication } from "@/authentication";
import { ErrorTag } from "@/rest/result";
import { Table } from "@mantine/core";
import React from "react";
import classes from './RestErrorViewer.module.css';


interface Props
{
    tag: ErrorTag;
    details: string;
    operation: string;
    extraContext?: { [key: string]: string };
}

export default function RestErrorViewer(props: Props): React.ReactNode
{
    const auth = useAuthentication();

    return (
        <Table variant="vertical" className={classes.table}>
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>Tag</Table.Th>
                    <Table.Td className={classes.rightColumn}>{props.tag}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Details</Table.Th>
                    <Table.Td className={classes.rightColumn}>{props.details}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Operation</Table.Th>
                    <Table.Td className={classes.rightColumn}>{props.operation}</Table.Td>
                </Table.Tr>
                {renderAuthenticationStatus()}
                {renderExtraContext()}
            </Table.Tbody>
        </Table>
    );


    function renderAuthenticationStatus()
    {
        if ( auth.status === 'authenticated' )
        {
            return (
                <Table.Tr>
                    <Table.Th>Authentication</Table.Th>
                    <Table.Td className={classes.rightColumn}>
                        {auth.username} ({auth.role})
                    </Table.Td>
                </Table.Tr>
            );
        }
        else
        {
            return (
                <Table.Tr>
                    <Table.Th>Authentication</Table.Th>
                    <Table.Td className={classes.rightColumn}>
                        Not authenticated
                    </Table.Td>
                </Table.Tr>
            );
        }
    }

    function renderExtraContext(): React.ReactNode
    {
        if ( props.extraContext )
        {
            return (
                <>
                    {Object.entries(props.extraContext).map(xs => renderContextRow(...xs))}
                </>
            )
        }
        else
        {
            return <></>;
        }
    }

    function renderContextRow(key: string, value: string): React.ReactNode
    {
        return (
            <Table.Tr>
                <Table.Th>{key}</Table.Th>
                <Table.Td className={classes.rightColumn}>{value}</Table.Td>
            </Table.Tr>
        );
    }
}

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

// function explainError(error: ErrorTag): React.ReactNode
// {
//     switch ( error )
//     {
//         case 'duplicate_item_in_sale':
//             return 'A sale can contain an item only once.'

//         case 'invalid_id':
//             return 'An invalid id was given.';

//         case 'invalid_item_description':
//             return 'The item description must not be empty.';

//         case 'invalid_item_id':
//             return 'The item id is invalid.';

//         case 'invalid_layout':
//             return 'The layout settings for the labels is invalid.';

//         case 'invalid_price':
//             return 'The price is invalid. It must be positive and a multiple of 50 cents.';

//         case 'invalid_request':
//             return 'This error should not occur; probably something network-related went wrong.'

//         case 'invalid_sale_id':
//             return 'The sale id is invalid.';

//         case 'invalid_uri_parameters':
//             return 'This error is due to a bug in the front-end.'

//         case 'invalid_user_id':
//             return 'The user ID is invalid.';

//         case 'item_frozen':
//             return 'The item is frozen. The operation requires the item to be unfrozen.';

//         case 'missing_items':
//             return 'Items are missing from the sale.';

//         case 'missing_session_id':
//             return 'No session id was found.';

//         case 'no_such_category':
//             return 'The category does not exist.';

//         case 'no_such_item':
//             return 'The item does not exist.';

//         case 'no_such_sale':
//             return 'The sale does not exist.';

//         case 'no_such_session':
//             return 'The session does not exist.';

//         case 'no_such_user':
//             return 'The user does not exist.';

//         case 'unknown':
//             return 'An unknown error occurred.'

//         case 'wrong_password':
//             return 'The wrong password was given.';

//         case 'wrong_role':
//             return (
//                 <Stack>
//                     <Text>
//                         The currently logged in user does not have the necessary permissions.
//                         Perhaps you logged in as a different user in another tab?
//                         If so, those credentials overwrote the ones in this tab.
//                     </Text>
//                     <Text>
//                         Possible solutions are
//                     </Text>
//                     <List>
//                         <List.Item>
//                             Use two different browsers.
//                         </List.Item>
//                         <List.Item>
//                             Use a regular tab, and one in incognito mode.
//                         </List.Item>
//                     </List>
//                 </Stack>
//             );

//         case 'wrong_seller':
//             return 'This seller does not have the necessary permissions to perform the operation.';

//         case 'wrong_user':
//             return 'This user does not have the necessary permissions to perform the operation.';
//     }
// }
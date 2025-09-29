import { ErrorTag } from "@/rest/result";
import { Table } from "@mantine/core";
import React from "react";


interface Props
{
    tag: ErrorTag;
    details: string;
}

export default function RestErrorViewer(props: Props): React.ReactNode
{
    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>Tag</Table.Th>
                    <Table.Td>{props.tag}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Details</Table.Th>
                    <Table.Td>{props.details}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Explanations</Table.Th>
                    <Table.Td>{explainError(props.tag)}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );
}

function explainError(error: ErrorTag): string
{
    switch ( error )
    {
        case 'duplicate_item_in_sale':
            return 'A sale can contain an item only once.'

        case 'invalid_id':
            return 'An invalid id was given.';

        case 'invalid_item_description':
            return 'The item description must not be empty.';

        case 'invalid_item_id':
            return 'The item id is invalid.';

        case 'invalid_layout':
            return 'The layout settings for the labels is invalid.';

        case 'invalid_price':
            return 'The price is invalid. It must be positive and a multiple of 50 cents.';

        case 'invalid_request':
            return 'This error should not occur; probably something network-related went wrong.'

        case 'invalid_sale_id':
            return 'The sale id is invalid.';

        case 'invalid_uri_parameters':
            return 'This error is due to a bug in the front-end.'

        case 'invalid_user_id':
            return 'The user ID is invalid.';

        case 'item_frozen':
            return 'The item is frozen. The operation requires the item to be unfrozen.';

        case 'missing_items':
            return 'Items are missing from the sale.';

        case 'missing_session_id':
            return 'No session id was found.';

        case 'no_such_category':
            return 'The category does not exist.';

        case 'no_such_item':
            return 'The item does not exist.';

        case 'no_such_sale':
            return 'The sale does not exist.';

        case 'no_such_session':
            return 'The session does not exist.';

        case 'no_such_user':
            return 'The user does not exist.';

        case 'unknown':
            return 'An unknown error occurred.'

        case 'wrong_password':
            return 'The wrong password was given.';

        case 'wrong_role':
            return 'The currently logged in user does not have the necessary permissions.';

        case 'wrong_seller':
            return 'This seller does not have the necessary permissions to perform the operation.';

        case 'wrong_user':
            return 'This user does not have the necessary permissions to perform the operation.';
    }
}
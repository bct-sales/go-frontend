import { Accordion, Stack, Title, Text } from "@mantine/core";
import { Link } from "react-router";
import classes from './HelpPage.module.css';


interface FrequentlyAskedQuestion
{
    value: string;
    question: string;
    answer: string;
}

export default function HelpPage() : React.ReactNode
{
    return (
        <Stack>
            <Title m='xl'>Frequently Asked Questions</Title>
            <Accordion variant="separated">
                {questions().map(renderQuestion)}
            </Accordion>
        </Stack>
    );


    function questions(): FrequentlyAskedQuestion[]
    {
        return [
            {
                value: "edit-item",
                question: "I made a mistake while entering item information. Can I still change it?",
                answer: `
                    Yes. Go to the item overview page and press the edit button next to the item you want to update.
                    Note that you can only edit items that you have not generated labels for yet.
                    Once you generate a label for an item, it becomes frozen and a little locked icon will replace the edit button.
                `,
            },
            {
                value: "frozen-item",
                question: "What does the little key icon mean in the items overview?",
                answer: `
                    The little key icon indicates that the item is frozen and cannot be edited.
                    An item becomes frozen once you generate a label for it.
                `,
            },
            {
                value: "why-frozen-item",
                question: "Why do items become frozen?",
                answer: `
                    The item information shown on the label must remain consistent with what this website
                    stores in its database, as the database dictates how much is charged on the sales day.
                    Say you increase the price of an item after generating a label,
                    then potential buyers would be tricked into believing that the item is cheaper than it actually is.
                `,
            },
            {
                value: "update-frozen-item",
                question: "I made a mistake, but the item is already frozen. What should I do?",
                answer: `
                    Create a new item with the correct information.
                    Having "unused" items in the database is not a problem.
                `,
            },
            {
                value: "change-label",
                question: "Can I make corrections directly on the label?",
                answer: `
                    No, in no case can you make corrections to the label.
                    Throw away the label and create a new item with the correct information.
                `,
            }
        ];
    }

    function renderQuestion(question: FrequentlyAskedQuestion): JSX.Element
    {
        return (
            <Accordion.Item value={question.value}>
                <Accordion.Control>
                    <Text className={classes.question}>
                    {question.question}
                    </Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Text className={classes.answer}>
                        {question.answer}
                    </Text>
                </Accordion.Panel>
            </Accordion.Item>
        );
    }
}
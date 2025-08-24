import { Accordion, Anchor, Stack, Text, Title } from "@mantine/core";
import React from "react";
import classes from './HelpPage.module.css';


interface FrequentlyAskedQuestion
{
    value: string;
    question: string;
    answer: React.ReactNode;
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
                answer: (
                    <Text className={classes.answer}>
                        Yes. Go to the item overview page and press the edit button next to the item you want to update.
                        Note that you can only edit items that you have not generated labels for yet.
                        Once you generate a label for an item, it becomes frozen and a little locked icon will replace the edit button.
                    </Text>
                ),
            },
            {
                value: "frozen-item",
                question: "What does the little key icon mean in the items overview?",
                answer: (
                    <Text className={classes.answer}>
                        The little key icon indicates that the item is frozen and cannot be edited.
                        An item becomes frozen once you generate a label for it.
                    </Text>
                ),
            },
            {
                value: "why-frozen-item",
                question: "Why do items become frozen?",
                answer: (
                    <Text className={classes.answer}>
                        The item information shown on the label must remain consistent with what this website
                        stores in its database, as the database dictates how much is charged on the sales day.
                        Say you increase the price of an item after generating a label,
                        then potential buyers would be tricked into believing that the item is cheaper than it actually is.
                    </Text>
                ),
            },
            {
                value: "update-frozen-item",
                question: "I made a mistake, but the item is already frozen. What should I do?",
                answer: (
                    <Text className={classes.answer}>
                        Create a new item with the correct information.
                        Having "unused" items in the database is not a problem.
                    </Text>
                ),
            },
            {
                value: "change-label",
                question: "Can I make corrections directly on the label?",
                answer: (
                    <Text className={classes.answer}>
                        No, in no case can you make corrections to the label.
                        Throw away the label and create a new item with the correct information.
                    </Text>
                ),
            },
            {
                value: "contact",
                question: "Who do I contact if I have questions?",
                answer: (
                    <Text className={classes.answer}>
                        If you have any questions, please send an email to <Anchor href="mailto:nnstechnologycoordinator@gmail.com">nnstechnologycoordinator@gmail.com</Anchor>.
                    </Text>
                ),
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
                    {question.answer}
                </Accordion.Panel>
            </Accordion.Item>
        );
    }
}
import {useShow} from "@refinedev/core";
import {Show} from "@refinedev/chakra-ui";

import {Heading, Text} from "@chakra-ui/react";

import type {ITask} from "../../interfaces";

export const TaskShow: React.FC = () => {
    const {query: queryResult} = useShow<ITask>();
    const {data, isLoading} = queryResult;
    const record = data?.data;

    const getStatus = (completed: string | undefined) => {
        console.log(completed);
        if (completed) return "Culminado";
        if (!completed) return "En proceso";
        return "Sin estatus";
    };
    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Tarea
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Descripción
            </Heading>
            <Text mt={2}>{record?.description}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Estatus
            </Heading>
            <Text mt={2}>{getStatus(record?.completed)}</Text>
        </Show>
    );
};
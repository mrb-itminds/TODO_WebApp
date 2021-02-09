import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genExampleClient, genTodoItemClient } from "services/backend/apiClients";
import {
  CreateExampleChildCommand,
  ExampleChildIdDto,
  ExampleEnum,
  ITodoItemIdDto,
  TodoItemIdDto,
  TodoStates
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import styles from "./styles.module.css";

const Start: FC = () => {
  const [data, setData] = useState<TodoItemIdDto[]>([]);
  const { route } = useRouter();
  const { t, locale, localeNameMap } = useLocales();
  const { menuBg, hoverBg, activeBg } = useColors();

  const fetchData = useCallback(async () => {
    try {
      const todoItemClient = await genTodoItemClient();
      const data = await todoItemClient.get();
      if (data && data.length > 0) setData(data);
      else logger.info("todoItemClient.get no data");
    } catch (err) {
      //logger.warn("todoItemClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function TodoList(props: { tableData: any }) {
    const numbers = props.tableData;
    const complete = true;

    const listItems = numbers.map((TodoItem: ITodoItemIdDto) => (
      <Tr key={TodoItem.id}>
        <Td>{TodoItem.id}</Td>
        <Td>{TodoItem.name}</Td>
        <Td>
          <Checkbox
            size="lg"
            colorScheme="green"
            defaultChecked={TodoItem.type == TodoStates.Complete}
            inputProps={{ "aria-label": "Checkbox A" }}
          />
        </Td>
      </Tr>
    ));

    return (
      <div>
        <Table variant="simple">
          <TableCaption placement="top">
            <Heading>TODO List</Heading>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Todo</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>{listItems}</Tbody>
        </Table>
      </div>
    );
  }

  return (
    <Container>
      <TodoList tableData={data}></TodoList>
    </Container>
  );
};
export default Start;

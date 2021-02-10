import {
  Box,
  Button,
  Center,
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
  Tr,
  Wrap
} from "@chakra-ui/react";
import TodoList from "components/TodoListTable";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import { TodoItemIdDto, TodoStates } from "services/backend/nswagts";
import { logger } from "utils/logger";

import CreateTodo from "./CreateTodoItem";
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

  return (
    <Container>
      <Wrap justify="center">
        <Heading>TODO List</Heading>
      </Wrap>
      <CreateTodo fetchData={fetchData}></CreateTodo>
      <TodoList tableData={data}></TodoList>
    </Container>
  );
};
export default Start;

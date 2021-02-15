import { Button, Center, Heading, Wrap } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { genTodoItemClient } from "services/backend/apiClients";
import { TodoItemIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import CreateTodo from "./CreateTodoItem";
import TableTabs from "./TodoTable/TableTabs";
import ColorModeToggle from "./Utility/ColorModeToggle";
import LanguageToggle from "./Utility/LanguageToggle";
import TodoCounter from "./Utility/TodoCounter";

const Start: FC = () => {
  const [data, setData] = useState<TodoItemIdDto[]>([]);
  const { t } = useLocales();

  const fetchData = useCallback(async () => {
    try {
      const todoItemClient = await genTodoItemClient();
      const data = await todoItemClient.get();
      if (data && data.length >= 0) setData(data);
      else logger.info("todoItemClient.get no data");
    } catch (err) {
      //logger.warn("todoItemClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Center>
      <Wrap width="700px" justify="center">
        <Heading>{t("example.title")}</Heading>

        <CreateTodo fetchData={fetchData}></CreateTodo>
        <TableTabs tableData={data} fetchData={fetchData}></TableTabs>
        <TodoCounter tableData={data}></TodoCounter>
        <LanguageToggle></LanguageToggle>
        <ColorModeToggle></ColorModeToggle>
        <Button marginLeft={10}>
          <CSVLink data={data}>Export as CSV</CSVLink>
        </Button>
      </Wrap>
    </Center>
  );
};
export default Start;

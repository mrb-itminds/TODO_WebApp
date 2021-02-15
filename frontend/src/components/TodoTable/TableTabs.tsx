import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect, useState } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import {
  ITodoItemIdDto,
  TodoItemIdDto,
  TodoStates,
  UpdateTodoItemCommand
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import TodoList from "./TodoListTable";

interface TableTabProps {
  tableData: TodoItemIdDto[];
  fetchData: () => Promise<void>;
}

const TableTabs: FC<TableTabProps> = props => {
  //const [data, setAllData] = useState(props.tableData);
  //const [activeData, setActiveData] = useState<TodoItemIdDto[]>([]);
  //const [completedData, setCompletedData] = useState<TodoItemIdDto[]>([]);
  const { t } = useLocales();
  const data = props.tableData;
  const activeData: TodoItemIdDto[] = [];
  const completedData: TodoItemIdDto[] = [];
  const toast = useToast();
  filterTables();

  const updateTodoText = useCallback(
    async value => {
      const todoClient = await genTodoItemClient();
      const command = new UpdateTodoItemCommand({
        id: value.id,
        todoItem: {
          name: value.name,
          type: value.type,
          userId: 1
        }
      });
      await todoClient.update(value.id, command);
      await props.fetchData();
      filterTables();
    },
    [data]
  );

  const updateTodoState = useCallback(async value => {
    const todoClient = await genTodoItemClient();
    if (value.type == TodoStates.Complete) {
      value.type = TodoStates.Active;
    } else value.type = TodoStates.Complete;
    const command = new UpdateTodoItemCommand({
      id: value.id,
      todoItem: {
        name: value.name,
        type: value.type,
        userId: 1
      }
    });
    await todoClient.update(value.id, command);
    await props.fetchData();
  }, []);

  const deleteTodo = useCallback(async value => {
    const todoClient = await genTodoItemClient();
    await todoClient.delete(value.id);
    await props.fetchData();
    filterTables();
  }, []);

  function filterTables() {
    data.forEach(function (value) {
      if (value.type == TodoStates.Complete) {
        completedData.push(value);
      }
      if (value.type == TodoStates.Active) {
        activeData.push(value);
      }
    });
  }

  useEffect(() => {
    filterTables();
  }, [data]);

  return (
    <Tabs marginTop="15px" isFitted variant="enclosed" size="md" defaultIndex={0}>
      <TabList>
        <Tab>{t("example.tableTabs.all")}</Tab>
        <Tab>{t("example.tableTabs.active")}</Tab>
        <Tab>{t("example.tableTabs.completed")}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TodoList
            tableData={props.tableData}
            fetchData={props.fetchData}
            updateTodoState={updateTodoState}
            updateTodoText={updateTodoText}
            deleteTodo={deleteTodo}></TodoList>
        </TabPanel>
        <TabPanel>
          <TodoList
            tableData={activeData}
            fetchData={props.fetchData}
            updateTodoState={updateTodoState}
            updateTodoText={updateTodoText}
            deleteTodo={deleteTodo}></TodoList>
        </TabPanel>
        <TabPanel>
          <TodoList
            tableData={completedData}
            fetchData={props.fetchData}
            updateTodoState={updateTodoState}
            updateTodoText={updateTodoText}
            deleteTodo={deleteTodo}></TodoList>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TableTabs;

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
  Tr
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import {
  ITodoItemIdDto,
  TodoItemIdDto,
  TodoStates,
  UpdateTodoItemCommand
} from "services/backend/nswagts";

import TodoList from "./TodoListTable";

interface TableTabProps {
  tableData: TodoItemIdDto[];
  fetchData: () => Promise<void>;
}

const TableTabs: FC<TableTabProps> = props => {
  const { t } = useLocales();
  const data = props.tableData;
  const activeData: TodoItemIdDto[] = [];
  const completedData: TodoItemIdDto[] = [];
  const fetchData = props.fetchData;
  filterTables();

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

  return (
    <Tabs marginTop="15px" isFitted variant="enclosed" size="md" defaultIndex={0}>
      <TabList>
        <Tab>{t("example.tableTabs.all")}</Tab>
        <Tab>{t("example.tableTabs.active")}</Tab>
        <Tab>{t("example.tableTabs.completed")}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TodoList tableData={data} fetchData={fetchData}></TodoList>
        </TabPanel>
        <TabPanel>
          <TodoList tableData={activeData} fetchData={fetchData}></TodoList>
        </TabPanel>
        <TabPanel>
          <TodoList tableData={completedData} fetchData={fetchData}></TodoList>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TableTabs;

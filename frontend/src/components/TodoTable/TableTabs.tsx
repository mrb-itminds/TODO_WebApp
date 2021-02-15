import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useEffect } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import { TodoItemIdDto, TodoStates, UpdateTodoItemCommand } from "services/backend/nswagts";

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
  }, [props.tableData]);

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

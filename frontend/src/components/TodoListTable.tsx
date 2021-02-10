import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  IconButton,
  MenuButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { IncomingMessage } from "http";
import React, { FC, useCallback } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import {
  ITodoItemIdDto,
  TodoItemIdDto,
  TodoStates,
  UpdateTodoItemCommand
} from "services/backend/nswagts";

const TodoList: FC<props> = (props: { tableData: TodoItemIdDto }) => {
  const numbers = props.tableData;

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
    props.fetchData();
  }, []);

  const deleteTodo = useCallback(async value => {
    const todoClient = await genTodoItemClient();
    await todoClient.delete(value.id);
    props.fetchData();
  }, []);

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
          onChange={() => {
            updateTodoState(TodoItem);
          }}
        />
      </Td>
      <Td>
        <IconButton
          onClick={() => {
            deleteTodo(TodoItem);
          }}
          aria-label="Search database"
          size="xs"
          icon={<DeleteIcon />}
        />
      </Td>
    </Tr>
  ));

  return (
    <div>
      <Table variant="simple">
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
};
export default TodoList;

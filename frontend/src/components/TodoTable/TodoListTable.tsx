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
  InputRightAddon as InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback } from "react";
import {
  ITodoItemIdDto,
  TodoItemIdDto,
  TodoStates,
  UpdateTodoItemCommand
} from "services/backend/nswagts";

import TableItem from "./TableItem";

interface TodoListProps {
  tableData: TodoItemIdDto[];
  fetchData: () => Promise<void>;
  updateTodoText(value: ITodoItemIdDto): () => Promise<void>;
  updateTodoState(value: ITodoItemIdDto): () => Promise<void>;
  deleteTodo(value: ITodoItemIdDto): () => Promise<void>;
}

const TodoList: FC<TodoListProps> = props => {
  const { t } = useLocales();
  const numbers = props.tableData;

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  return (
    <div>
      <Table minWidth="700px" variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Todo</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <TableItem
          tableData={numbers}
          fetchData={props.fetchData}
          updateTodoState={props.updateTodoState}
          updateTodoText={props.updateTodoText}
          deleteTodo={props.deleteTodo}></TableItem>
      </Table>
    </div>
  );
};
export default TodoList;

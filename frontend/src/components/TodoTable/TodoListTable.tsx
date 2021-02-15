import { Table, Th, Thead, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { ITodoItemIdDto, TodoItemIdDto } from "services/backend/nswagts";

import TableItem from "./TableItem";

interface TodoListProps {
  tableData: TodoItemIdDto[];
  updateTodoText(value: ITodoItemIdDto): () => Promise<void>;
  updateTodoState(value: ITodoItemIdDto): () => Promise<void>;
  deleteTodo(value: ITodoItemIdDto): () => Promise<void>;
}

const TodoList: FC<TodoListProps> = props => {
  const numbers = props.tableData;

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
          updateTodoState={props.updateTodoState}
          updateTodoText={props.updateTodoText}
          deleteTodo={props.deleteTodo}></TableItem>
      </Table>
    </div>
  );
};
export default TodoList;

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
import { FC } from "react";
import { ITodoItemIdDto, TodoItemIdDto, TodoStates } from "services/backend/nswagts";

const TodoList: FC = (props: { tableData: TodoItemIdDto }) => {
  const numbers = props.tableData;

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

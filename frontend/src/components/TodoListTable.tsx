import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
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
import { Field, Form, Formik } from "formik";
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

  const updateTodoText = useCallback(async value => {
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
    props.fetchData();
  }, []);

  const deleteTodo = useCallback(async value => {
    const todoClient = await genTodoItemClient();
    await todoClient.delete(value.id);
    props.fetchData();
  }, []);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  const listItems = numbers.map((TodoItem: ITodoItemIdDto) => (
    <Tr key={TodoItem.id}>
      <Td>{TodoItem.id}</Td>

      <Td>
        <Formik
          initialValues={{ name: TodoItem.name }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              TodoItem.name = values.name;
              updateTodoText(TodoItem);
              actions.setSubmitting(false);
            }, 1000);
          }}>
          {props => (
            <Form>
              <Container>
                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <Input {...field} type="text" name="name" placeholder="Todo" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                  Submit
                </Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Td>
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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>{listItems}</Tbody>
      </Table>
    </div>
  );
};
export default TodoList;

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

  const listItems = numbers.map((TodoItem: ITodoItemIdDto) => (
    <Tr key={TodoItem.id}>
      <Td>{TodoItem.id}</Td>

      <Td>
        <Formik
          initialValues={{ name: TodoItem.name }}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
              TodoItem.name = values.name;
              props.updateTodoText(TodoItem);
              actions.setSubmitting(false);
            }, 1000);
          }}>
          {props => (
            <Form>
              <Container>
                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <InputGroup size="md">
                        <Input {...field} type="text" name="name" />
                        <InputRightAddon padding={0} width={20}>
                          <Button
                            isFullWidth={true}
                            rounded={false}
                            isLoading={props.isSubmitting}
                            type="submit">
                            {t("example.actions.updateTodo")}
                          </Button>
                        </InputRightAddon>
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </InputGroup>
                    </FormControl>
                  )}
                </Field>
              </Container>
            </Form>
          )}
        </Formik>
      </Td>
      <Td>
        <Checkbox
          size="lg"
          colorScheme="green"
          //defaultChecked={TodoItem.type == TodoStates.Complete}
          isChecked={TodoItem.type == TodoStates.Complete}
          inputProps={{ "aria-label": "Checkbox A" }}
          onChange={() => {
            props.updateTodoState(TodoItem);
          }}
        />
      </Td>
      <Td>
        <IconButton
          onClick={() => {
            props.deleteTodo(TodoItem);
          }}
          aria-label="Search database"
          size="xs"
          bgColor="red.200"
          icon={<DeleteIcon />}
        />
      </Td>
    </Tr>
  ));

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
        <Tbody>{listItems}</Tbody>
      </Table>
    </div>
  );
};
export default TodoList;

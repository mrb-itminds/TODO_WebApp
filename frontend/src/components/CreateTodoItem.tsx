import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import { genTodoItemClient } from "services/backend/apiClients";
import {
  CreateTodoItemCommand,
  ITodoItemIdDto,
  TodoItemDto,
  TodoItemIdDto,
  TodoStates
} from "services/backend/nswagts";

const CreateTodo: FC<props> = props => {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }

  const addTodoItem = useCallback(async value => {
    const todoClient = await genTodoItemClient();
    await todoClient.create(
      new CreateTodoItemCommand({
        todoItem: {
          name: value.name,
          type: TodoStates.Active,
          userId: 1
        }
      })
    );
    props.fetchData();
  }, []);

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          addTodoItem(values);

          actions.setSubmitting(false);
        }, 1000);
      }}>
      {props => (
        <Form>
          <Container>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Add a new Todo</FormLabel>
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
  );
};
export default CreateTodo;

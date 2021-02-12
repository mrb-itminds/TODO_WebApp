import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLocales } from "hooks/useLocales";
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
  const { t, locale, localeNameMap } = useLocales();

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
          <Container minWidth="700px">
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">{t("example.addTodoLine")}</FormLabel>
                  <InputGroup size="lg">
                    <Input {...field} type="text" name="name" placeholder="Todo" />
                    <InputRightAddon>
                      <Button isLoading={props.isSubmitting} type="submit">
                        {t("example.actions.addNew")}
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
  );
};
export default CreateTodo;

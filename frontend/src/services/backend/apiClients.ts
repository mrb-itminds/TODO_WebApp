import { api } from "./api";
import { ExampleChildClient, TodoItemClient } from "./nswagts";

export const genExampleClient = (): Promise<ExampleChildClient> => api(ExampleChildClient);

export const genTodoItemClient = (): Promise<TodoItemClient> => api(TodoItemClient);

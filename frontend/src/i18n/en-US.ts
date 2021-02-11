import { TodoStates } from "services/backend/nswagts";

import { Locale } from "./Locale";

export const table: Locale = {
  locale: "English (US)",

  example: {
    title: "Todo List",
    byLine: "When data is loading it is displayed below",
    dataLine: "Child {{id}} of type {{type}}",
    todoItemLine: "id:{{id}}  {{name}} - Status {{type}}",
    addTodoLine: "Add a new Todo",

    actions: {
      addNew: "Add",
      updateTodo: "Update"
    }
  }
};

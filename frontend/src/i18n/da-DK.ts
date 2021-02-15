import { Locale } from "./Locale";

export const table: Locale = {
  locale: "Dansk",

  example: {
    title: "Todo Liste",
    byLine: "Når dataen er indhentet vises den her",
    dataLine: "{{type}} Barn {{id}} ",
    todoItemLine: "id:{{id}}  {{name}} - Opgaven er {{type}}",
    addTodoLine: "Tilføj en ny Todo",
    completeCounter: "{{completed}} færdiggjort ud af {{total}}",

    actions: {
      addNew: "Tilføj",
      updateTodo: "Opdater"
    },
    tableTabs: {
      all: "Alle",
      active: "Aktive",
      completed: "Færdige"
    },
    toasts: {
      added: "Tiløjede ny todo",
      updated: "Opdaterede en todo",
      deleted: "Slettede en todo"
    }
  }
};

export interface Locale {
  locale: string;

  example: {
    title: string;
    byLine: string;
    dataLine: string;
    todoItemLine: string;
    addTodoLine: string;
    completeCounter: string;

    actions: {
      addNew: string;
      updateTodo: string;
    };
    tableTabs: {
      all: string;
      active: string;
      completed: string;
    };
    toasts: {
      added: string;
      updated: string;
      deleted: string;
    };
  };
}

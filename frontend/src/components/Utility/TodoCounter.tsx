import { Box, Container, Text as pre } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { TodoItemIdDto, TodoStates } from "services/backend/nswagts";

interface CounterProps {
  tableData: TodoItemIdDto[];
}

const TodoCounter: FC<CounterProps> = props => {
  const { route } = useRouter();
  const { t, locale, localeNameMap } = useLocales();

  function checkCompleted(data: TodoItemIdDto[]) {
    let completed = 0;
    data.forEach(function (value) {
      if (value.type == TodoStates.Complete) {
        completed++;
      }
    });
    return completed;
  }

  return (
    <Container textAlign="left">
      <pre>
        {t("example.completeCounter", {
          completed: checkCompleted(props.tableData),
          total: props.tableData.length
        })}
      </pre>
    </Container>
  );
};

export default TodoCounter;

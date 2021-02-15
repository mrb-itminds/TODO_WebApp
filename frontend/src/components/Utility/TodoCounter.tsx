import { Container, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { TodoItemIdDto, TodoStates } from "services/backend/nswagts";

interface CounterProps {
  tableData: TodoItemIdDto[];
}

const TodoCounter: FC<CounterProps> = props => {
  const { t } = useLocales();

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
      <Text>
        {t("example.completeCounter", {
          completed: checkCompleted(props.tableData),
          total: props.tableData.length
        })}
      </Text>
    </Container>
  );
};

export default TodoCounter;

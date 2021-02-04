import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import { genExampleClient } from "services/backend/apiClients";
import {
  CreateExampleChildCommand,
  ExampleChildIdDto,
  ExampleEnum
} from "services/backend/nswagts";
import { logger } from "utils/logger";

import styles from "./styles.module.css";

const Demo: FC = () => {
  const [data, setData] = useState<ExampleChildIdDto[]>([]);

  const { route } = useRouter();
  const { t, locale, localeNameMap } = useLocales();
  const { menuBg, hoverBg, activeBg } = useColors();

  const fetchData = useCallback(async () => {
    try {
      const exampleClient = await genExampleClient();
      const data = await exampleClient.get();
      if (data && data.length > 0) setData(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  const addNewData = useCallback(async () => {
    const exampleClient = await genExampleClient();
    await exampleClient.create(
      new CreateExampleChildCommand({
        child: {
          name: Date.now().toString(32),
          parentId: 1,
          type: ExampleEnum.Middle
        }
      })
    );
    await fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container>
      <Heading className={styles.title}>{t("example.title")}</Heading>
      <Text>{t("example.byLine")}</Text>

      <pre data-testid="data" data-value={data.length}>
        {data.map(dat => (
          <div key={dat.id}>
            {t("example.dataLine", {
              id: dat.id,
              type: dat.type
            })}
          </div>
        ))}
      </pre>
      <pre>
        {localeNameMap &&
          Object.entries(localeNameMap).map(([id, name]) => (
            <Link key={id} href={route} locale={id} passHref>
              <Box
                p={2}
                m={2}
                bgColor={id === locale ? activeBg : menuBg}
                cursor="pointer"
                _hover={{
                  bgColor: hoverBg
                }}>
                <a>{name}</a>
              </Box>
            </Link>
          ))}
      </pre>
      <Button colorScheme="green" data-testid="addNewBtn" onClick={addNewData}>
        {t("example.actions.addNew")}
      </Button>
    </Container>
  );
};

export default Demo;

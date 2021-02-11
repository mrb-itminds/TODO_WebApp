import { Box } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

const LanguageToggle: FC = () => {
  const { route } = useRouter();
  const { t, locale, localeNameMap } = useLocales();
  const { menuBg, hoverBg, activeBg } = useColors();

  return (
    <pre>
      {localeNameMap &&
        Object.entries(localeNameMap).map(([id, name]) => (
          <Link key={id} href={route} locale={id} passHref>
            <Box
              userSelect="none"
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
  );
};

export default LanguageToggle;

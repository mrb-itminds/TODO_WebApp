import { Button, useColorMode } from "@chakra-ui/react";

const ColorModeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
    </header>
  );
};
export default ColorModeToggle;

import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const ThemeToggleButton = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      aria-label={`Activate ${colorMode === "light" ? "dark" : "light"} mode`}
    />
  );
};

export default ThemeToggleButton;

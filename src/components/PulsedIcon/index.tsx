import React from "react";
import { TimeIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import styled, { keyframes } from "styled-components";

const PulsedIcon = () => {
  const { colorMode } = useColorMode();

  const pulseAnimation = keyframes`from { opacity: .5; }`;

  const PulsedIcon = styled(TimeIcon)`
    animation: ${pulseAnimation} 0.75s infinite alternate;
  `;

  return (
    <PulsedIcon color={colorMode === "light" ? "red.500" : "red.400"} mr={2} />
  );
};

export default PulsedIcon;

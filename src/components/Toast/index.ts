import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const success = (message: string, description?: string) => {
  toast({
    title: message,
    description: description,
    status: "success",
    position: "bottom-right",
    duration: 5000,
    isClosable: true,
  });
};

export const warning = (message: string, description: string) => {
  toast({
    title: message,
    description: description,
    status: "warning",
    position: "bottom-right",
    duration: 5000,
    isClosable: true,
  });
};

export const failure = (message: string, description: string) => {
  toast({
    title: message,
    description: description,
    status: "error",
    position: "bottom-right",
    duration: 5000,
    isClosable: true,
  });
};

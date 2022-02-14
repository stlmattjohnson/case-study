import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { WrapperComponent } from "@testing-library/react-hooks";
import { WrapperProps } from "./TestingUtils";

export const renderWrapper = (ui: React.ReactElement, initialEntry: string) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const theme = extendTheme({
    components: {
      Steps,
    },
  });

  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{ui}</ChakraProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

export const renderWrapperNoRoute = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const theme = extendTheme({
    components: {
      Steps,
    },
  });

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>{ui}</ChakraProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

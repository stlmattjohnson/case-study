import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Flex,
  ThemeConfig,
} from "@chakra-ui/react";
import { Home } from "./pages/Home";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import ThemeToggleButton from "./components/ThemeToggle";

const queryClient = new QueryClient();

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Steps,
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Flex justify="flex-end" m="4" position="relative">
            <ThemeToggleButton />
          </Flex>
          <Home />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

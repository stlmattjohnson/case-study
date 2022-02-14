import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Home } from "./pages/Home";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const queryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Steps,
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Home />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

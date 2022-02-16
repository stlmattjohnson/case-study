import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Flex,
  TabList,
  Tabs,
  ThemeConfig,
} from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import ThemeToggleButton from "./components/ThemeToggle";
import { Home } from "./pages/Home";
import Search from "./pages/Search";
import LinkTab from "./components/LinkTab/LinkTab";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

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
          <Box m={4}>
            <Tabs colorScheme="telegram" variant="line" align="end" isLazy>
              <TabList>
                <LinkTab
                  href="/"
                  dataTestId="trip-planner-tab"
                  ariaLabel="Navigate to Trip Planner Tab"
                >
                  Trip Planner
                </LinkTab>
                <LinkTab
                  href="/search"
                  dataTestId="search-stops-tab"
                  ariaLabel="Navigate to Search Stops Tab"
                >
                  Search Stops
                </LinkTab>
                <Flex justify="flex-end" marginY="2" ml="2" position="relative">
                  <ThemeToggleButton />
                </Flex>
              </TabList>
            </Tabs>

            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

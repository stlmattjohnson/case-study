import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ThemeConfig,
} from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import ThemeToggleButton from "./components/ThemeToggle";
import { Home } from "./pages/Home";
import Search from "./pages/Search";

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
                <Tab data-testid="trip-planner-tab">Trip Planner</Tab>
                <Tab data-testid="search-stops-tab">Search Stops</Tab>
                <Flex
                  justify="flex-end"
                  marginY="2"
                  marginX="4"
                  position="relative"
                >
                  <ThemeToggleButton />
                </Flex>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Home />
                </TabPanel>
                <TabPanel>
                  <Search />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

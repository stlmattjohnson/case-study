import React, { useEffect, useState } from "react";
import {
  Center,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import useSearchStops from "@/hooks/useSearchStops";
import useDebounce from "@/hooks/useDebounce";
import ErrorAlert from "@/components/ErrorAlert";
import * as toast from "../../components/Toast";
import FilterBar from "@/components/FilterBar";
import PulsedIcon from "@/components/PulsedIcon";

const SearchStops = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce({ searchTerm });
  const { data, isLoading, isError, isFetching } =
    useSearchStops(debouncedTerm);

  useEffect(() => {
    if (data?.alerts) {
      data?.alerts.forEach((alert) => {
        const message = alert.alert_text ?? "No update available.";
        alert.stop_closed
          ? toast.failure("Stop Closed", message)
          : toast.warning("Stop Update", message);
      });
    }
  }, [data]);

  return (
    <Center my={4} data-testid="search-stops-box">
      <Flex w={["95%", "50%"]} flexDir="column">
        <FilterBar
          placeholder="Search Stops"
          value={searchTerm}
          setValue={setSearchTerm}
        />
        <VStack gap={2} pt={2}>
          {isLoading || (isFetching && <Progress size="md" isIndeterminate />)}

          {isError && debouncedTerm.length && (
            <ErrorAlert
              type={" info for that stop. Please verify the number is correct"}
            />
          )}

          {data && (
            <Table
              variant="striped"
              width="100%"
              data-testid="search-stops-table"
            >
              <Thead>
                {data?.stops?.length && (
                  <Tr>
                    <Th colSpan={2}>{data.stops[0].description}</Th>
                    <Th isNumeric>Stop #: {data.stops[0].stop_id}</Th>
                  </Tr>
                )}

                <Tr>
                  <Th>Route</Th>
                  <Th>Destination</Th>
                  <Th isNumeric>Departs</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.departures?.length === 0 && (
                  <Tr data-testid="departure-list-empty">
                    <Td colSpan={3}>
                      <Center>
                        No Departures for selected Route/Direction/Stop.
                      </Center>
                    </Td>
                  </Tr>
                )}
                {data?.departures?.map((departure, index) => (
                  <Tr key={index}>
                    <Td data-testid={`departure-${index}-route-short-name`}>
                      {departure.route_short_name}
                    </Td>
                    <Td data-testid={`departure-${index}-description`}>
                      {departure.description}
                    </Td>
                    <Td isNumeric data-testid={`departure-${index}-text`}>
                      {String(departure.departure_text).includes("Min") && (
                        <PulsedIcon />
                      )}
                      {departure.departure_text}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </VStack>
      </Flex>
    </Center>
  );
};

export default SearchStops;

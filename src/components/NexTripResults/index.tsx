import React from "react";
import useNexTripResults from "../../hooks/useNexTripResults";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Center,
  Tbody,
  VStack,
  Progress,
} from "@chakra-ui/react";

type DeparturesListProps = {
  routeId: string;
  directionId: string;
  placeCode: string;
};

const NexTripResults = ({
  routeId,
  directionId,
  placeCode,
}: DeparturesListProps) => {
  const { data, isLoading, isError } = useNexTripResults(
    routeId,
    directionId,
    placeCode
  );

  return (
    <VStack gap={2} pt={2}>
      <Table variant="striped" width="100%" data-testid="nextripresult-table">
        <Thead>
          <Tr>
            <Th>Stop ID</Th>
            <Th>Description</Th>
            <Th isNumeric>Departs In</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>
                <Progress size="md" isIndeterminate />
              </Td>
            </Tr>
          )}
          {isError && (
            <Tr>
              <Td colSpan={4}>
                Could not retrieve result for Route/Direction/Stop.
              </Td>
            </Tr>
          )}
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
              <Td data-testid={`departure-${index}-stop-id`}>
                {departure.stop_id}
              </Td>
              <Td data-testid={`departure-${index}-description`}>
                {departure.description}
              </Td>
              <Td isNumeric data-testid={`departure-${index}-text`}>
                {departure.departure_text}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default React.memo(NexTripResults);

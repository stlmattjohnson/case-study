import React, { useEffect } from "react";
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
import ErrorAlert from "../ErrorAlert";
import * as toast from "../Toast";
import PulsedIcon from "../PulsedIcon";

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
    <VStack gap={2} pt={2}>
      <Table variant="striped" width="100%" data-testid="nextripresult-table">
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
                <ErrorAlert type={"result for Route/Direction/Stop"} />
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
    </VStack>
  );
};

export default NexTripResults;

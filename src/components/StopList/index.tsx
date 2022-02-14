import React, { useContext } from "react";
import useStops from "../../hooks/useStops";
import {
  Center,
  IconButton,
  Link,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import Stop from "../../models/Stop";
import { TripContext } from "../../pages/Home";
import { stringifyDetails } from "../../bin/Utils";

type StopSelectProps = {
  routeId: string;
  directionId: string;
};

const StopSelect = ({ routeId, directionId }: StopSelectProps) => {
  const { data, isLoading, isError } = useStops(routeId, directionId);

  const { setStop, setStopDetails } = useContext(TripContext);

  const onChange = (newStop: Stop) => {
    setStop(newStop);
    setStopDetails(stringifyDetails([newStop.place_code, newStop.description]));
  };

  return (
    <VStack gap={2} pt={2}>
      <Table variant="striped" width="100%" data-testid="stop-list-table">
        <Thead>
          <Tr>
            <Th>Place Code</Th>
            <Th>Description</Th>
            <Th isNumeric>Get Departures</Th>
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
              <Td colSpan={4}>Could not retrieve Stops.</Td>
            </Tr>
          )}
          {data?.length === 0 && (
            <Tr data-testid="stop-list-empty">
              <Td colSpan={4}>
                <Center>
                  No stops available for this route and direction.
                </Center>
              </Td>
            </Tr>
          )}
          {data?.map((stop, index) => (
            <Tr key={index}>
              <Td data-testid={`stop-${stop.place_code}-place-code`}>
                {stop.place_code}
              </Td>
              <Td data-testid={`stop-${stop.place_code}-description`}>
                {stop.description}
              </Td>
              <Td isNumeric>
                <Link
                  as={ReactRouterLink}
                  to={`/${routeId}/${directionId}/${stop.place_code}`}
                  onClick={() => onChange(stop)}
                  data-testid={`stop-${stop.place_code}-link`}
                >
                  <IconButton
                    aria-label={`Get departures for stop ${stop.place_code} with description ${stop.description}`}
                    size="sm"
                    colorScheme="gray"
                    icon={<ArrowRightIcon />}
                  ></IconButton>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default React.memo(StopSelect);

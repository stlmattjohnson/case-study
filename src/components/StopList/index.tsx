import React, { useContext, useState } from "react";
import useStops from "../../hooks/useStops";
import {
  Center,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Stop from "../../models/Stop";
import { TripContext } from "../../pages/Home";
import { stringifyDetails } from "../../bin/Utils";
import ErrorAlert from "../ErrorAlert";
import useFilter from "../../hooks/useFilter";
import FilterBar from "../FilterBar";
import LinkButton from "../LinkButton";

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

  const [searchTerm, setSearchTerm] = useState("");

  const { filteredData, isFiltering } = useFilter<Stop>({
    searchTerm,
    data,
  });

  return (
    <VStack gap={2} pt={2}>
      <FilterBar
        placeholder="Search Stops"
        value={searchTerm}
        setValue={setSearchTerm}
      />
      <Table variant="striped" width="100%" data-testid="stop-list-table">
        <Thead>
          <Tr>
            <Th>Place Code</Th>
            <Th>Description</Th>
            <Th isNumeric>Get Departures</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(isLoading || isFiltering) && (
            <Tr>
              <Td colSpan={4}>
                <Progress size="md" isIndeterminate />
              </Td>
            </Tr>
          )}
          {isError && (
            <Tr>
              <Td colSpan={4}>
                <ErrorAlert type={"Stops"} />
              </Td>
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
          {filteredData?.map((stop, index) => (
            <Tr key={index}>
              <Td data-testid={`stop-${stop.place_code}-place-code`}>
                {stop.place_code}
              </Td>
              <Td data-testid={`stop-${stop.place_code}-description`}>
                {stop.description}
              </Td>
              <Td isNumeric>
                <LinkButton
                  href={`/${routeId}/${directionId}/${stop.place_code}`}
                  ariaLabel={`Get departures for stop ${stop.place_code} with description ${stop.description}`}
                  dataTestId={`stop-${stop.place_code}-link`}
                  onChange={() => onChange(stop)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default StopSelect;

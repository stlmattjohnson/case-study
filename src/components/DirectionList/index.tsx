import React, { useContext } from "react";
import useDirections from "../../hooks/useDirections";
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
import Direction from "../../models/Direction";
import { TripContext } from "../../pages/Home";
import { stringifyDetails } from "../../bin/Utils";
import ErrorAlert from "../ErrorAlert";
import LinkButton from "../LinkButton";

type DirectionSelectProps = {
  routeId: string;
};

const DirectionList = ({ routeId }: DirectionSelectProps) => {
  const { data, isLoading, isError } = useDirections(routeId);

  const { setStop, setDirection, setDirectionDetails } =
    useContext(TripContext);

  const onChange = (newDirection: Direction) => {
    setStop(undefined);
    setDirection(newDirection);
    setDirectionDetails(stringifyDetails([newDirection.direction_name]));
  };

  return (
    <VStack gap={2} pt={2}>
      <Table variant="striped" width="100%" data-testid="direction-list-table">
        <Thead>
          <Tr>
            <Th>Direction</Th>
            <Th isNumeric>Get Stops</Th>
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
                <ErrorAlert type={"Directions"} />
              </Td>
            </Tr>
          )}
          {data?.length === 0 && (
            <Tr data-testid="direction-list-empty">
              <Td colSpan={4}>
                <Center>No directions available for this route.</Center>
              </Td>
            </Tr>
          )}
          {data?.map((direction, index) => (
            <Tr key={index}>
              <Td data-testid={`direction-${direction.direction_id}-name`}>
                {direction.direction_name}
              </Td>
              <Td isNumeric>
                <LinkButton
                  href={`/${routeId}/${direction.direction_id}`}
                  ariaLabel={`Select direction ${direction.direction_name} for route ${routeId}`}
                  dataTestId={`direction-${direction.direction_id}-link`}
                  onChange={() => onChange(direction)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default React.memo(DirectionList);

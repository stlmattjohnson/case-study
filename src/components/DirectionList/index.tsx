import React from "react";
import useDirections from "../../hooks/useDirections";
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
import Direction from "../../models/Direction";

type DirectionSelectProps = {
  onChange: (direction: Direction) => void;
  routeId: string;
};

const DirectionList = ({ onChange, routeId }: DirectionSelectProps) => {
  const { data, isLoading, isError } = useDirections(routeId);

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
              <Td colSpan={4}>Could not retrieve Directions.</Td>
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
                <Link
                  as={ReactRouterLink}
                  to={`/${routeId}/${direction.direction_id}`}
                  onClick={() => onChange(direction)}
                  data-testid={`direction-${direction.direction_id}-link`}
                >
                  <IconButton
                    aria-label={`Select direction ${direction.direction_name} for route ${routeId}`}
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

export default React.memo(DirectionList);

import React, { useContext } from "react";
import useRoutes from "../../hooks/useRoutes";
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
import Route from "../../models/Route";
import { TripContext } from "../../pages/Home";
import { stringifyDetails } from "../../bin/Utils";
import ErrorAlert from "../ErrorAlert";

const RouteList = () => {
  const { data, isLoading, isError } = useRoutes();

  const { setDirection, setStop, setRoute, setRouteDetails } =
    useContext(TripContext);

  const onChange = (newRoute: Route) => {
    setDirection(undefined);
    setStop(undefined);
    setRoute(newRoute);
    setRouteDetails(
      stringifyDetails([
        newRoute.agency_id,
        newRoute.route_id,
        newRoute.route_label,
      ])
    );
  };

  return (
    <VStack gap={2} pt={2}>
      <Table variant="striped" width="100%" data-testid="route-list-table">
        <Thead>
          <Tr>
            <Th>Agency</Th>
            <Th>Route ID</Th>
            <Th>Route Label</Th>
            <Th isNumeric>Get Directions</Th>
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
                <ErrorAlert type={"Routes"} />
              </Td>
            </Tr>
          )}
          {data?.length === 0 && (
            <Tr data-testid="route-list-empty">
              <Td colSpan={4}>
                <Center>No routes currently available.</Center>
              </Td>
            </Tr>
          )}
          {data?.map((route, index) => (
            <Tr key={index}>
              <Td data-testid={`route-${route.route_id}-agency`}>
                {route.agency_id}
              </Td>
              <Td data-testid={`route-${route.route_id}-id`}>
                {route.route_id}
              </Td>
              <Td data-testid={`route-${route.route_id}-label`}>
                {route.route_label}
              </Td>
              <Td isNumeric>
                <Link
                  as={ReactRouterLink}
                  to={`/${route.route_id}`}
                  onClick={() => onChange(route)}
                  data-testid={`route-${route.route_id}-link`}
                >
                  <IconButton
                    aria-label={`Select route ${route.route_id} from agency ${route.agency_id} with label ${route.route_label}`}
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

export default React.memo(RouteList);

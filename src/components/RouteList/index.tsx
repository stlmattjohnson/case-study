import React, { useContext, useState } from "react";
import useRoutes from "../../hooks/useRoutes";
import {
  Center,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Route from "../../models/Route";
import { TripContext } from "../../pages/Home";
import { stringifyDetails } from "../../bin/Utils";
import ErrorAlert from "../ErrorAlert";
import useFilter from "../../hooks/useFilter";
import FilterBar from "../FilterBar";
import LinkButton from "../LinkButton";

const RouteList = () => {
  const { data, isLoading, isError } = useRoutes();
  const displayExtraData = useBreakpointValue({ sm: false, md: true });

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

  const [searchTerm, setSearchTerm] = useState("");

  const { filteredData, isFiltering } = useFilter<Route>({
    searchTerm,
    data,
  });

  return (
    <VStack gap={2} pt={2}>
      <FilterBar
        placeholder="Search Routes"
        value={searchTerm}
        setValue={setSearchTerm}
      />

      <Table variant="striped" width="100%" data-testid="route-list-table">
        <Thead>
          <Tr>
            {displayExtraData && <Th>Agency</Th>}
            <Th>Route ID</Th>
            <Th>Route Label</Th>
            <Th isNumeric>Get Directions</Th>
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
          {!isLoading &&
            !isFiltering &&
            filteredData?.map((route, index) => (
              <Tr key={index}>
                {displayExtraData && (
                  <Td data-testid={`route-${route.route_id}-agency`}>
                    {route.agency_id}
                  </Td>
                )}
                <Td data-testid={`route-${route.route_id}-id`}>
                  {route.route_id}
                </Td>
                <Td data-testid={`route-${route.route_id}-label`}>
                  {route.route_label}
                </Td>
                <Td isNumeric>
                  <LinkButton
                    href={`/${route.route_id}`}
                    ariaLabel={`Select route ${route.route_id} from agency ${route.agency_id} with label ${route.route_label}`}
                    dataTestId={`route-${route.route_id}-link`}
                    onChange={() => onChange(route)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default RouteList;

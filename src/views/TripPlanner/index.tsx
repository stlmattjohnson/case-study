import React, { useState } from "react";
import RouteList from "../../components/RouteList";
import Route from "../../models/Route";
import { RouteParams } from "../../bin/RouteParams";
import { Center, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TripPlanner = () => {
  const { routeId, directionId, placeCode } = useParams<RouteParams>();

  const [route, setRoute] = useState<Route | undefined>();

  const handleRouteChange = (newRoute: Route) => {
    setRoute(newRoute);
  };

  return (
    <Center padding={"2em"} mb={8} data-testid="trip-planner-box">
      <Flex width="80%" flexDir="column">
        <RouteList onChange={handleRouteChange} />
      </Flex>
    </Center>
  );
};

export default TripPlanner;

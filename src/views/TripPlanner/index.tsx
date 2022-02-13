import React, { useState } from "react";
import { RouteParams } from "../../bin/RouteParams";
import { Center, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import RouteList from "../../components/RouteList";
import Route from "../../models/Route";
import DirectionList from "../../components/DirectionList";
import Direction from "../../models/Direction";

const TripPlanner = () => {
  const { routeId, directionId, placeCode } = useParams<RouteParams>();

  const [route, setRoute] = useState<Route | undefined>();
  const [direction, setDirection] = useState<Direction | undefined>();

  const handleRouteChange = (newRoute: Route) => {
    setDirection(undefined);
    setRoute(newRoute);
  };

  const handleDirectionChange = (newDirection: Direction) => {
    setDirection(newDirection);
  };

  return (
    <Center padding={"2em"} mb={8} data-testid="trip-planner-box">
      <Flex width="80%" flexDir="column">
        <RouteList onChange={handleRouteChange} />
        {routeId && (
          <DirectionList routeId={routeId} onChange={handleDirectionChange} />
        )}
      </Flex>
    </Center>
  );
};

export default TripPlanner;

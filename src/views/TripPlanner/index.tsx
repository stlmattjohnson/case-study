import React, { useState } from "react";
import { RouteParams } from "../../bin/RouteParams";
import { Center, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import RouteList from "../../components/RouteList";
import Route from "../../models/Route";
import DirectionList from "../../components/DirectionList";
import Direction from "../../models/Direction";
import Stop from "../../models/Stop";
import StopList from "../../components/StopList";
import NexTripResults from "../../components/NexTripResults";

const TripPlanner = () => {
  const { routeId, directionId, placeCode } = useParams<RouteParams>();

  const [route, setRoute] = useState<Route | undefined>();
  const [direction, setDirection] = useState<Direction | undefined>();
  const [stop, setStop] = useState<Stop | undefined>();

  const handleRouteChange = (newRoute: Route) => {
    setDirection(undefined);
    setStop(undefined);
    setRoute(newRoute);
  };

  const handleDirectionChange = (newDirection: Direction) => {
    setStop(undefined);
    setDirection(newDirection);
  };

  const handleStopChange = (newStop: Stop) => {
    setStop(newStop);
  };

  return (
    <Center padding={"2em"} mb={8} data-testid="trip-planner-box">
      <Flex width="80%" flexDir="column">
        <RouteList onChange={handleRouteChange} />
        {routeId && (
          <DirectionList routeId={routeId} onChange={handleDirectionChange} />
        )}
        {routeId && directionId && (
          <StopList
            routeId={routeId}
            directionId={directionId}
            onChange={handleStopChange}
          />
        )}
        {routeId && directionId && placeCode && (
          <NexTripResults
            routeId={routeId}
            directionId={directionId}
            placeCode={placeCode}
          />
        )}
      </Flex>
    </Center>
  );
};

export default TripPlanner;

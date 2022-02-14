import React, { createContext, useState } from "react";
import TripContextType from "../../bin/TripContextType";
import Direction from "../../models/Direction";
import Route from "../../models/Route";
import Stop from "../../models/Stop";
import HomeRoutes from "./routes";

const defaultValue: TripContextType = {
  route: undefined,
  setRoute: () => null,
  routeDetails: undefined,
  setRouteDetails: () => null,
  direction: undefined,
  setDirection: () => null,
  directionDetails: undefined,
  setDirectionDetails: () => null,
  stop: undefined,
  setStop: () => null,
  stopDetails: undefined,
  setStopDetails: () => null,
};

export const TripContext = createContext<TripContextType>(defaultValue);

export const Home = () => {
  const [route, setRoute] = useState<Route | undefined>();
  const [routeDetails, setRouteDetails] = useState<string | undefined>();
  const [direction, setDirection] = useState<Direction | undefined>();
  const [directionDetails, setDirectionDetails] = useState<
    string | undefined
  >();
  const [stop, setStop] = useState<Stop | undefined>();
  const [stopDetails, setStopDetails] = useState<string | undefined>();

  const contextValue: TripContextType = {
    route: route,
    setRoute: setRoute,
    routeDetails: routeDetails,
    setRouteDetails: setRouteDetails,
    direction: direction,
    setDirection: setDirection,
    directionDetails: directionDetails,
    setDirectionDetails: setDirectionDetails,
    stop: stop,
    setStop: setStop,
    stopDetails: stopDetails,
    setStopDetails: setStopDetails,
  };

  return (
    <TripContext.Provider value={contextValue}>
      <HomeRoutes />
    </TripContext.Provider>
  );
};

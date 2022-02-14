import Route from "../models/Route";
import Direction from "../models/Direction";
import Stop from "../models/Stop";

type TripContextType = {
  route?: Route;
  setRoute: React.Dispatch<React.SetStateAction<Route | undefined>>;
  routeDetails?: string;
  setRouteDetails: React.Dispatch<React.SetStateAction<string | undefined>>;
  direction?: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction | undefined>>;
  directionDetails?: string;
  setDirectionDetails: React.Dispatch<React.SetStateAction<string | undefined>>;
  stop?: Stop;
  setStop: React.Dispatch<React.SetStateAction<Stop | undefined>>;
  stopDetails?: string;
  setStopDetails: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default TripContextType;

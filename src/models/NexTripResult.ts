import Stop from "./Stop";
import AlertMessage from "./AlertMessage";
import Departure from "./Departure";

export default interface NexTripResult {
  stops?: Stop[] | null;
  alerts?: AlertMessage[] | null;
  departures?: Departure[] | null;
}

import { useQuery } from "react-query";
import Api from "../../api";

const getStops = (route_id: string, direction_id: string) => {
  return Api.stops.get(route_id, direction_id);
};

export default function useStops(route_id: string, direction_id: string) {
  return useQuery(["stops", route_id, direction_id], () =>
    getStops(route_id, direction_id)
  );
}

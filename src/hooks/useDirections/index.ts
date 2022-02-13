import { useQuery } from "react-query";
import Api from "../../api";

const getDirections = (route_id: string) => {
  return Api.directions.get(route_id);
};

export default function useDirections(route_id: string) {
  return useQuery(["directions", route_id], () => getDirections(route_id));
}

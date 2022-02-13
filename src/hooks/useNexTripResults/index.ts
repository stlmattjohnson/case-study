import { useQuery } from "react-query";
import Api from "../../api";

const getNexTripResults = (
  route_id: string,
  direction_id: string,
  place_code: string
) => {
  return Api.nexTripResults.get(route_id, direction_id, place_code);
};

export default function useNexTripResults(
  route_id: string,
  direction_id: string,
  place_code: string
) {
  return useQuery(["nexTripResults", route_id, direction_id, place_code], () =>
    getNexTripResults(route_id, direction_id, place_code)
  );
}

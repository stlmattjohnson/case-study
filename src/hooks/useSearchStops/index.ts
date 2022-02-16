import { useQuery } from "react-query";
import Api from "../../api";

const getSearchStopsResults = (stop_id: string) => {
  return Api.searchStops.get(stop_id);
};

export default function useSearchStops(stop_id: string) {
  return useQuery(
    ["searchStops", stop_id],
    () => getSearchStopsResults(stop_id),
    { retry: false, enabled: !!stop_id }
  );
}

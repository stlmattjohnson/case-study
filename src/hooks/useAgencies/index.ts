import { useQuery } from "react-query";
import Api from "../../api";

const getAgencies = () => {
  return Api.agencies.get();
};

export default function useAgencies() {
  return useQuery(["agencies"], () => getAgencies());
}

import { useQuery } from "react-query";
import Api from "../../api";

const getRoutes = () => {
  return Api.routes.get();
};

export default function useRoutes() {
  return useQuery(["routes"], () => getRoutes());
}

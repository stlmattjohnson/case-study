import axios, { AxiosInstance } from "axios";
import AgencyApi from "./Agencies";
import RoutesApi from "./Routes";
import DirectionsApi from "./Directions";
import StopsApi from "./Stops";
import NexTripResultsApi from "./NexTripResults";

const DEFAULT_BASE_URL = "https://svc.metrotransit.org/nextripv2";

const createApiClient = (baseUrl: string): AxiosInstance => {
  const client = axios.create({
    baseURL: baseUrl,
  });

  return client;
};

const apiClient = createApiClient(DEFAULT_BASE_URL);

const Api = {
  agencies: new AgencyApi(apiClient),
  routes: new RoutesApi(apiClient),
  directions: new DirectionsApi(apiClient),
  stops: new StopsApi(apiClient),
  nexTripResults: new NexTripResultsApi(apiClient),
};

export default Api;

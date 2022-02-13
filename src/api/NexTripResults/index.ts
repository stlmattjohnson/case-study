import { AxiosInstance } from "axios";
import NexTripResult from "../../models/NexTripResult";
import { deAxios } from "../Utils";

export default class NexTripResultsApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(
    route_id: string,
    direction_id: string,
    place_code: string
  ): Promise<NexTripResult> {
    return deAxios(
      this.api.get<NexTripResult>(`/${route_id}/${direction_id}/${place_code}`)
    );
  }
}

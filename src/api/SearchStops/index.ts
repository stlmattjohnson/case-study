import { AxiosInstance } from "axios";
import NexTripResult from "../../models/NexTripResult";
import { deAxios } from "../Utils";

export default class SearchStopsApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(stop_id: string): Promise<NexTripResult> {
    return deAxios(this.api.get<NexTripResult>(`/${stop_id}`));
  }
}

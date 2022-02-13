import { AxiosInstance } from "axios";
import Stop from "../../models/Stop";
import { deAxios } from "../Utils";

export default class StopsApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(route_id: string, direction_id: string): Promise<Stop[]> {
    return deAxios(this.api.get<Stop[]>(`/stops/${route_id}/${direction_id}`));
  }
}

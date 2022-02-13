import { AxiosInstance } from "axios";
import Direction from "../../models/Direction";
import { deAxios } from "../Utils";

export default class DirectionsApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(route_id: string): Promise<Direction[]> {
    return deAxios(this.api.get<Direction[]>(`/directions/${route_id}`));
  }
}

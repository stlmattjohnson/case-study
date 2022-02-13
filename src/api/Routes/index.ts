import { AxiosInstance } from "axios";
import Route from "../../models/Route";
import { deAxios } from "../Utils";

export default class RoutesApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(): Promise<Route[]> {
    return deAxios(this.api.get<Route[]>(`/routes`));
  }
}

import { AxiosInstance } from "axios";
import Agency from "../../models/Agency";
import { deAxios } from "../Utils";

export default class AgencyApi {
  private api: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.api = apiClient;
  }

  async get(): Promise<Agency[]> {
    return deAxios(this.api.get<Agency[]>(`/agencies`));
  }
}

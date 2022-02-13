import RoutesApi from ".";
import Route from "../../models/Route";
import axios from "axios";
import { createAxiosResponse } from "../Utils/testutils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Routes API", () => {
  test("it should return an array of routes", async () => {
    const routesApi = new RoutesApi(axios);

    const routes: Route[] = [
      {
        agency_id: 1,
        route_id: "test route",
      },
    ];

    const data = createAxiosResponse(routes);

    axios.get = jest.fn().mockResolvedValueOnce(data);

    const result = await routesApi.get();

    expect(result).toEqual(routes);
  });
});

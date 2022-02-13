import { deAxios } from ".";
import Route from "../../models/Route";
import { createAxiosResponse } from "../../bin/testutils";

describe("API Utils", () => {
  test("deAxios should remove AxiosResponse wrappers and return the provided type", async () => {
    const routes: Route[] = [
      {
        agency_id: 1,
        route_id: "test route",
      },
    ];

    const data = createAxiosResponse(routes);

    const apiCall = jest.fn(() => {
      return Promise.resolve(data);
    });

    const result = await deAxios<Route[]>(apiCall());

    expect(result).toEqual(routes);
  });
});

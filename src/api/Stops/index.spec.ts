import StopsApi from ".";
import Stop from "../../models/Stop";
import axios from "axios";
import { createAxiosResponse } from "../../bin/TestingUtils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Stops API", () => {
  test("it should return an array of stops", async () => {
    const stopsApi = new StopsApi(axios);

    const stops: Stop[] = [
      {
        place_code: "place",
        stop_id: 1,
        latitude: 2,
        longitude: 3,
      },
    ];

    const data = createAxiosResponse(stops);

    axios.get = jest.fn().mockResolvedValueOnce(data);

    const result = await stopsApi.get("route", "direction");

    expect(result).toEqual(stops);
  });
});

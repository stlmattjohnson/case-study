import NexTripResultsApi from ".";
import NexTripResult from "../../models/NexTripResult";
import Stop from "../../models/Stop";
import axios from "axios";
import { createAxiosResponse } from "../../bin/testutils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("NexTripResults API", () => {
  test("it should return a NexTripResult object", async () => {
    const departuresApi = new NexTripResultsApi(axios);

    const stops: Stop[] = [
      {
        place_code: "test",
        stop_id: 1,
        latitude: 2,
        longitude: 3,
      },
    ];

    const nexTripResult: NexTripResult = {
      stops: stops,
    };

    const data = createAxiosResponse(nexTripResult);

    axios.get = jest.fn().mockResolvedValueOnce(data);

    const result = await departuresApi.get("route", "direction", "place");

    expect(result).toEqual(nexTripResult);
  });
});

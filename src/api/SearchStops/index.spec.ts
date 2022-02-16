import NexTripResult from "../../models/NexTripResult";
import Stop from "../../models/Stop";
import axios from "axios";
import { createAxiosResponse } from "../../bin/TestingUtils";
import SearchStopsApi from ".";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("SearchStops API", () => {
  test("it should return a NexTripResult object", async () => {
    const searchStopsApi = new SearchStopsApi(axios);

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

    const result = await searchStopsApi.get("1");

    expect(result).toEqual(nexTripResult);
  });
});

import DirectionsApi from ".";
import Direction from "../../models/Direction";
import axios from "axios";
import { createAxiosResponse } from "../../bin/TestingUtils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Directions API", () => {
  test("it should return an array of directions", async () => {
    const directionsApi = new DirectionsApi(axios);

    const directions: Direction[] = [
      {
        direction_id: 1,
        direction_name: "east",
      },
    ];

    const data = createAxiosResponse(directions);

    axios.get = jest.fn().mockResolvedValueOnce(data);

    const result = await directionsApi.get("route");

    expect(result).toEqual(directions);
  });
});

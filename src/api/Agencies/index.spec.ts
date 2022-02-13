import AgencyApi from ".";
import Agency from "../../models/Agency";
import axios from "axios";
import { createAxiosResponse } from "../../bin/TestingUtils";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("Agencies API", () => {
  test("it should return an array of agencies", async () => {
    const agenciesApi = new AgencyApi(axios);

    const agencies: Agency[] = [
      {
        agency_id: 1,
      },
    ];

    const data = createAxiosResponse(agencies);

    axios.get = jest.fn().mockResolvedValueOnce(data);

    const result = await agenciesApi.get();

    expect(result).toEqual(agencies);
  });
});

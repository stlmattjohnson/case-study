import React from "react";
import { screen } from "@testing-library/react";
import StopList from ".";
import Api from "../../api";
import Stop from "../../models/Stop";
import "@testing-library/jest-dom/extend-expect";
import { renderWrapperNoRoute } from "../../bin/RenderWrapper";

describe("Components > StopList", () => {
  test("it should render", async () => {
    const data: Stop[] = [];

    jest.spyOn(Api.stops, "get").mockResolvedValue(data);

    renderWrapperNoRoute(<StopList routeId="route" directionId="1" />);

    expect(await screen.findByTestId("stop-list-table")).toBeInTheDocument();
    expect(await screen.findByTestId("stop-list-empty")).toBeInTheDocument();
  });

  test("it should display stops returned from API call correctly", async () => {
    const data: Stop[] = [
      {
        place_code: "place_code",
        description: "description",
        stop_id: 1,
        latitude: 2,
        longitude: 3,
      },
    ];
    const routeId = "route";
    const directionId = "1";

    jest.spyOn(Api.stops, "get").mockResolvedValue(data);

    renderWrapperNoRoute(
      <StopList routeId={routeId} directionId={directionId} />
    );

    const stop: Stop = data[0];

    expect(
      await screen.queryByTestId("stop-list-empty")
    ).not.toBeInTheDocument();
    expect(
      await screen.findByTestId(`stop-${stop.place_code}-place-code`)
    ).toHaveTextContent(stop.place_code);
    expect(
      await screen.findByTestId(`stop-${stop.place_code}-description`)
    ).toHaveTextContent(String(stop.description));
    expect(
      await screen.findByTestId(`stop-${stop.place_code}-link`)
    ).toHaveAttribute("href", `/${routeId}/${directionId}/${stop.place_code}`);
  });
});

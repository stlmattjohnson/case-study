import React from "react";
import { screen } from "@testing-library/react";
import DirectionList from ".";
import Api from "../../api";
import Direction from "../../models/Direction";
import "@testing-library/jest-dom/extend-expect";
import { renderWrapperNoRoute } from "../../bin/RenderWrapper";

describe("Components > DirectionList", () => {
  test("it should render", async () => {
    const data: Direction[] = [];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    renderWrapperNoRoute(<DirectionList routeId="route" />);

    expect(
      await screen.findByTestId("direction-list-table")
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId("direction-list-empty")
    ).toBeInTheDocument();
  });

  test("it should display directions returned from API call correctly", async () => {
    const data: Direction[] = [
      {
        direction_id: 1,
        direction_name: "northbound",
      },
    ];
    const routeId = "route";

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    renderWrapperNoRoute(<DirectionList routeId={routeId} />);

    const direction: Direction = data[0];

    expect(
      await screen.queryByTestId("direction-list-empty")
    ).not.toBeInTheDocument();
    expect(
      await screen.findByTestId(`direction-${direction.direction_id}-name`)
    ).toHaveTextContent(String(direction.direction_name));
    expect(
      await screen.findByTestId(`direction-${direction.direction_id}-link`)
    ).toHaveAttribute("href", `/${routeId}/${direction.direction_id}`);
  });
});

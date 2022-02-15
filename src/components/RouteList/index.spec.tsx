import React from "react";
import { screen } from "@testing-library/react";
import RouteList from ".";
import Api from "../../api";
import Route from "../../models/Route";
import "@testing-library/jest-dom/extend-expect";
import { renderWrapperNoRoute } from "../../bin/RenderWrapper";

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {
        //Setting empty
      },
      removeListener: () => {
        //Setting empty
      },
    };
  },
});

describe("Components > RouteList", () => {
  test("it should render", async () => {
    const data: Route[] = [];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    renderWrapperNoRoute(<RouteList />);

    expect(await screen.findByTestId("route-list-table")).toBeInTheDocument();
    expect(await screen.findByTestId("route-list-empty")).toBeInTheDocument();
  });

  test("it should display routes returned from API call correctly", async () => {
    const data: Route[] = [
      {
        agency_id: 1,
        route_id: "route",
        route_label: "route label",
      },
    ];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    renderWrapperNoRoute(<RouteList />);

    const route: Route = data[0];

    expect(
      await screen.queryByTestId("route-list-empty")
    ).not.toBeInTheDocument();
    expect(
      await screen.findByTestId(`route-${route.route_id}-id`)
    ).toHaveTextContent(route.route_id);
    expect(
      await screen.findByTestId(`route-${route.route_id}-label`)
    ).toHaveTextContent(String(route.route_label));
    expect(
      await screen.findByTestId(`route-${route.route_id}-link`)
    ).toHaveAttribute("href", `/${route.route_id}`);
  });
});

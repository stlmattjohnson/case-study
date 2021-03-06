import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, screen } from "@testing-library/react";
import TripPlanner from "./";
import Api from "../../api";
import Route from "../../models/Route";
import Direction from "../../models/Direction";
import { Route as RouterRoute, Routes } from "react-router-dom";
import Stop from "../../models/Stop";
import NexTripResult from "../../models/NexTripResult";
import { renderWrapper } from "../../bin/RenderWrapper";

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

describe("Views > TripPlanner", () => {
  test("it should render routes list on initial load", async () => {
    const data: Route[] = [];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    renderWrapper(<TripPlanner />, "/");

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(await screen.findByTestId("route-list-table")).toBeInTheDocument();
  });

  test("it should render directions list when routeId param present", async () => {
    const data: Direction[] = [];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    act(() => {
      renderWrapper(
        <Routes>
          <RouterRoute path="/:routeId" element={<TripPlanner />} />
        </Routes>,
        "/routeId"
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(
      await screen.findByTestId("direction-list-table")
    ).toBeInTheDocument();
    expect(
      await screen.queryByTestId("route-list-table")
    ).not.toBeInTheDocument();
  });

  test("it should render stops list when routeId/directionId params present", async () => {
    const data: Stop[] = [];

    jest.spyOn(Api.stops, "get").mockResolvedValue(data);

    act(() => {
      renderWrapper(
        <Routes>
          <RouterRoute
            path="/:routeId/:directionId"
            element={<TripPlanner />}
          />
        </Routes>,
        "/route/direction"
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(await screen.findByTestId("stop-list-table")).toBeInTheDocument();
    expect(
      await screen.queryByTestId("direction-list-table")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByTestId("route-list-table")
    ).not.toBeInTheDocument();
  });

  test("it should render nextripresult when routeId/directionId/placeCode params present", async () => {
    const data: NexTripResult = {
      departures: [],
    };

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    act(() => {
      renderWrapper(
        <Routes>
          <RouterRoute
            path="/:routeId/:directionId/:placeCode"
            element={<TripPlanner />}
          />
        </Routes>,
        "/route/direction/stop"
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(
      await screen.findByTestId("nextripresult-table")
    ).toBeInTheDocument();
    expect(
      await screen.queryByTestId("stop-list-table")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByTestId("direction-list-table")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByTestId("route-list-table")
    ).not.toBeInTheDocument();
  });
});

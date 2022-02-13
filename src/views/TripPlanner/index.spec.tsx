import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import TripPlanner from "./";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Route from "../../models/Route";
import Direction from "../../models/Direction";
import { MemoryRouter, Route as RouterRoute, Routes } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Stop from "../../models/Stop";
import NexTripResult from "../../models/NexTripResult";

describe("Views > TripPlanner", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render routes list on initial load", async () => {
    const data: Route[] = [];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <TripPlanner />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(await screen.findByTestId("route-list-table")).toBeInTheDocument();
  });

  test("it should render directions list when routeId param present", async () => {
    const data: Direction[] = [];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    act(() => {
      render(
        <MemoryRouter initialEntries={["/routeId"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <RouterRoute path="/:routeId" element={<TripPlanner />} />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(
      await screen.findByTestId("direction-list-table")
    ).toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("route-list-table")
    // ).not.toBeInTheDocument();
  });

  test("it should render stops list when routeId/directionId params present", async () => {
    const data: Stop[] = [];

    jest.spyOn(Api.stops, "get").mockResolvedValue(data);

    act(() => {
      render(
        <MemoryRouter initialEntries={["/route/direction"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <RouterRoute
                path="/:routeId/:directionId"
                element={<TripPlanner />}
              />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(await screen.findByTestId("stop-list-table")).toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("direction-list-table")
    // ).not.toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("route-list-table")
    // ).not.toBeInTheDocument();
  });

  test("it should render nextripresult when routeId/directionId/placeCode params present", async () => {
    const data: NexTripResult = {
      departures: [],
    };

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    act(() => {
      render(
        <MemoryRouter initialEntries={["/route/direction/stop"]}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <RouterRoute
                path="/:routeId/:directionId/:placeCode"
                element={<TripPlanner />}
              />
            </Routes>
          </QueryClientProvider>
        </MemoryRouter>
      );
    });

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument();
    expect(
      await screen.findByTestId("nextripresult-table")
    ).toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("stop-list-table")
    // ).not.toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("direction-list-table")
    // ).not.toBeInTheDocument();
    // expect(
    //   await screen.findByTestId("route-list-table")
    // ).not.toBeInTheDocument();
  });
});

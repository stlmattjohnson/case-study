import React from "react";
import { render, screen } from "@testing-library/react";
import TripPlanner from "./";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Route from "../../models/Route";
import Direction from "../../models/Direction";
import {
  BrowserRouter,
  MemoryRouter,
  Route as RouterRoute,
  Router,
  Routes,
} from "react-router-dom";
import { act } from "react-dom/test-utils";
import { createMemoryHistory } from "history";

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

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument;
    expect(await screen.findByTestId("route-list-table")).toBeInTheDocument;
  });

  test("it should render directions list when routeId param present", async () => {
    const data: Direction[] = [];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    const history = createMemoryHistory();
    const route = "/route";
    history.push(route);

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

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument;
    expect(await screen.findByTestId("direction-list-table")).toBeInTheDocument;
    expect(await screen.findByTestId("route-list-table")).toBeNull;
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import TripPlanner from "./";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Route from "../../models/Route";

describe("Views > TripPlanner", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const data: Route[] = [];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <TripPlanner />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("trip-planner-box")).toBeInTheDocument;
  });
});

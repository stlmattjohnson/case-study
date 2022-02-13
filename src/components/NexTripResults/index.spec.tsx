import React from "react";
import { render, screen } from "@testing-library/react";
import NexTripResults from ".";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import NexTripResult from "../../models/NexTripResult";
import Departure from "../../models/Departure";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Components > DirectionList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const data: NexTripResult = {
      departures: [],
    };

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <NexTripResults routeId="route" directionId="1" placeCode="stop" />
      </QueryClientProvider>
    );

    expect(
      await screen.findByTestId("nextripresult-table")
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId("departure-list-empty")
    ).toBeInTheDocument();
  });

  test("it should display departures returned from API call correctly", async () => {
    const departures: Departure[] = [
      {
        route_id: "route",
        direction_id: 2,
        stop_id: 1,
        description: "description",
        departure_text: "departure text",
      },
    ];

    const data: NexTripResult = {
      departures: departures,
    };

    const routeId = "route";
    const directionId = "1";
    const placeCode = "stop";

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NexTripResults
            routeId={routeId}
            directionId={directionId}
            placeCode={placeCode}
          />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const departure: Departure = departures[0];

    expect(
      await screen.findByTestId("departure-list-empty")
    ).not.toBeInTheDocument();
    expect(await screen.findByTestId("departure-0-stop-id")).toHaveTextContent(
      String(departure.stop_id)
    );
    expect(
      await screen.findByTestId("departure-0-description")
    ).toHaveTextContent(String(departure.description));
    expect(await screen.findByTestId("departure-0-text")).toHaveTextContent(
      String(departure.departure_text)
    );
  });
});

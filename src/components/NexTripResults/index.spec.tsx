import React from "react";
import { render, screen } from "@testing-library/react";
import NexTripResults from ".";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import NexTripResult from "../../models/NexTripResult";
import Departure from "../../models/Departure";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AlertMessage from "../../models/AlertMessage";
import { renderWrapperNoRoute } from "../../bin/RenderWrapper";

describe("Components > DirectionList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const data: NexTripResult = {
      departures: [],
    };

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    renderWrapperNoRoute(
      <NexTripResults routeId="route" directionId="1" placeCode="stop" />
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
        route_short_name: "short name",
      },
    ];

    const data: NexTripResult = {
      departures: departures,
    };

    const routeId = "route";
    const directionId = "1";
    const placeCode = "stop";

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    renderWrapperNoRoute(
      <NexTripResults
        routeId={routeId}
        directionId={directionId}
        placeCode={placeCode}
      />
    );

    const departure: Departure = departures[0];

    expect(
      await screen.queryByTestId("departure-list-empty")
    ).not.toBeInTheDocument();
    expect(
      await screen.findByTestId("departure-0-route-short-name")
    ).toHaveTextContent(String(departure.route_short_name));
    expect(
      await screen.findByTestId("departure-0-description")
    ).toHaveTextContent(String(departure.description));
    expect(await screen.findByTestId("departure-0-text")).toHaveTextContent(
      String(departure.departure_text)
    );
  });

  test("it should display toasts for alerts returned from API call correctly", async () => {
    const alerts: AlertMessage[] = [
      {
        stop_closed: true,
        alert_text: "alert text",
      },
      {
        stop_closed: false,
      },
    ];

    const data: NexTripResult = {
      alerts: alerts,
    };

    const routeId = "route";
    const directionId = "1";
    const placeCode = "stop";

    jest.spyOn(Api.nexTripResults, "get").mockResolvedValue(data);

    renderWrapperNoRoute(
      <NexTripResults
        routeId={routeId}
        directionId={directionId}
        placeCode={placeCode}
      />
    );

    expect(await screen.findAllByText("alert text")).toHaveLength(1);
    expect(await screen.findAllByText("No update available.")).toHaveLength(1);
  });
});

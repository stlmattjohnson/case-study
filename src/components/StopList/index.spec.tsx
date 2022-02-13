import React from "react";
import { render, screen } from "@testing-library/react";
import StopList from ".";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Stop from "../../models/Stop";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Components > StopList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const onChange = jest.fn();
    const data: Stop[] = [];

    jest.spyOn(Api.stops, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <StopList routeId="route" directionId="1" onChange={onChange} />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("stop-list-table")).toBeInTheDocument();
    expect(await screen.findByTestId("stop-list-empty")).toBeInTheDocument();
  });

  test("it should display stops returned from API call correctly", async () => {
    const onChange = jest.fn();
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

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <StopList
            routeId={routeId}
            directionId={directionId}
            onChange={onChange}
          />
        </QueryClientProvider>
      </MemoryRouter>
    );

    const stop: Stop = data[0];

    expect(
      await screen.findByTestId("stop-list-empty")
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

import React from "react";
import { render, screen } from "@testing-library/react";
import DirectionList from ".";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Direction from "../../models/Direction";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Components > DirectionList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const onChange = jest.fn();
    const data: Direction[] = [];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <DirectionList routeId="route" onChange={onChange} />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("direction-list-table")).toBeInTheDocument;
  });

  test("it should display directions returned from API call correctly", async () => {
    const onChange = jest.fn();
    const data: Direction[] = [
      {
        direction_id: 1,
        direction_name: "northbound",
      },
    ];
    const routeId = "route";

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <DirectionList routeId={routeId} onChange={onChange} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const direction: Direction = data[0];

    expect(
      await screen.findByTestId(`direction-${direction.direction_id}-name`)
    ).toHaveTextContent(String(direction.direction_name));
    expect(
      await screen.findByTestId(`direction-${direction.direction_id}-link`)
    ).toHaveAttribute("href", `/${routeId}/${direction.direction_id}`);
  });
});

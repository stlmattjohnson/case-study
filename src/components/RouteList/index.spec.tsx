import React from "react";
import { render, screen } from "@testing-library/react";
import RouteList from ".";
import Api from "../../api";
import { QueryClient, QueryClientProvider } from "react-query";
import Route from "../../models/Route";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Components > RouteList", () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  test("it should render", async () => {
    const onChange = jest.fn();
    const data: Route[] = [];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    render(
      <QueryClientProvider client={queryClient}>
        <RouteList onChange={onChange} />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("route-list-table")).toBeInTheDocument();
    expect(await screen.findByTestId("route-list-empty")).toBeInTheDocument();
  });

  test("it should display routes returned from API call correctly", async () => {
    const onChange = jest.fn();
    const data: Route[] = [
      {
        agency_id: 1,
        route_id: "route",
        route_label: "route label",
      },
    ];

    jest.spyOn(Api.routes, "get").mockResolvedValue(data);

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RouteList onChange={onChange} />
        </QueryClientProvider>
      </BrowserRouter>
    );

    const route: Route = data[0];

    expect(
      await screen.findByTestId("route-list-empty")
    ).not.toBeInTheDocument();
    expect(
      await screen.findByTestId(`route-${route.route_id}-agency`)
    ).toHaveTextContent(String(route.agency_id));
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

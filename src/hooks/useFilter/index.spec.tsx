import React from "react";
import Route from "../../models/Route";
import { renderHook } from "@testing-library/react-hooks";
import useFilter from "./";

describe("useFilter Hook", () => {
  test("it renders", async () => {
    const routes: Route[] = [
      {
        agency_id: 1,
        route_id: "main",
        route_label: "main bus",
      },
      {
        agency_id: 2,
        route_id: "secondary",
        route_label: "secondary bus",
      },
    ];

    const searchTerm = "main";

    const { result, waitForNextUpdate } = renderHook(() =>
      useFilter({ searchTerm: searchTerm, data: routes })
    );

    await waitForNextUpdate();
    expect(result.current.isFiltering).toBeFalsy();
    expect(result.current.filteredData).toHaveLength(1);
  });
});

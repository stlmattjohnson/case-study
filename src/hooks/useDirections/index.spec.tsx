import React from "react";
import { renderHook, WrapperComponent } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import useDirections from ".";
import Api from "../../api";
import { WrapperProps } from "../../bin/TestingUtils";
import Direction from "../../models/Direction";

describe("useDirections Hook", () => {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {
      // Setting empty so API error does not log.
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const wrapper: WrapperComponent<WrapperProps> = ({
    children,
  }: WrapperProps) => {
    wrapper.displayName = "QueryClientWrapper";
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it("should return data when API responds 200", async () => {
    const data: Direction[] = [
      {
        direction_id: 1,
      },
    ];

    jest.spyOn(Api.directions, "get").mockResolvedValue(data);

    const { result, waitForNextUpdate } = renderHook(
      () => useDirections("route"),
      {
        wrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(data);
  });

  it("should return error when API responds with error", async () => {
    jest.spyOn(Api.directions, "get").mockRejectedValue("");

    const { result, waitForNextUpdate } = renderHook(
      () => useDirections("route"),
      {
        wrapper,
      }
    );

    await waitForNextUpdate();

    expect(result.current.isError).toEqual(true);
  });
});

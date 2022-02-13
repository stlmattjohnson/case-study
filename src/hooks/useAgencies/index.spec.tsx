import React from "react";
import { renderHook, WrapperComponent } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import useAgencies from ".";
import Api from "../../api";
import { WrapperProps } from "../../bin/testutils";
import Agency from "../../models/Agency";

describe("useAgencies Hook", () => {
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
    const data: Agency[] = [
      {
        agency_id: 1,
      },
    ];

    jest.spyOn(Api.agencies, "get").mockResolvedValue(data);

    const { result, waitForNextUpdate } = renderHook(() => useAgencies(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.data).toEqual(data);
  });

  it("should return error when API responds with error", async () => {
    jest.spyOn(Api.agencies, "get").mockRejectedValue("");

    const { result, waitForNextUpdate } = renderHook(() => useAgencies(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.isError).toEqual(true);
  });
});

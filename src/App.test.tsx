import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App test", () => {
  test("it should render and contain header text", async () => {
    act(() => {
      render(<App />);
    });
    waitFor(() =>
      expect(screen.findByTestId("App-header")).toHaveTextContent("Case Study")
    );
  });
});

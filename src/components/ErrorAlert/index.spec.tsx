import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorAlert from ".";
import "@testing-library/jest-dom/extend-expect";

describe("Components > ErrorAlert", () => {
  test("it should render with provided type in message", async () => {
    render(<ErrorAlert type="Route" />);

    expect(await screen.findByTestId("error-alert")).toBeInTheDocument();
    expect(
      await screen.getByText("Could not retrieve Route.")
    ).toBeInTheDocument();
  });
});

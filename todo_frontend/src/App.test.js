import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders main header and add-input", () => {
  render(<App />);
  expect(screen.getByText(/Simple Todo App/i)).toBeInTheDocument();
  const input = screen.getByPlaceholderText(/What needs to be done/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("");
});

test("renders filter buttons", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Completed" })).toBeInTheDocument();
});

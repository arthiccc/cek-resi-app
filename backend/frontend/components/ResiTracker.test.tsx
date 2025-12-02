
import React from 'react';
import { render, screen } from "@testing-library/react";
import ResiTracker from "./ResiTracker";

test("renders ResiTracker component", () => {
  render(<ResiTracker />);
  const inputElement = screen.getByPlaceholderText(/masukkan nomor resi/i);
  expect(inputElement).toBeInTheDocument();
});

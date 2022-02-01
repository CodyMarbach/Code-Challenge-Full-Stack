import { render, screen } from '@testing-library/react';
import App from './App';

test('renders paper title', () => {
  render(<App />);
  const titleElement = screen.getByText("Fishfry Tours");
  expect(titleElement).toBeInTheDocument();
});

test('render input fields', () => {
  render(<App />);
  const boatNameInput = screen.getByLabelText('Boat Name')
  expect(boatNameInput).toBeInTheDocument();

  const statusSelect = screen.getByTestId("select")
  expect(statusSelect).toBeInTheDocument();

  const notesInput = screen.getByLabelText('Notes')
  expect(notesInput).toBeInTheDocument();
});

test('render buttons', () => {
  render(<App />);

  const submitButton = document.getElementById("SubmitButton");
  expect(submitButton).toBeInTheDocument();

  const resetButton = document.getElementById("ResetButton");
  expect(resetButton).toBeInTheDocument();
});